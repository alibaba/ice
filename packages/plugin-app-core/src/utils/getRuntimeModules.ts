import * as path from 'path';
import * as fse from 'fs-extra';
import * as globby from 'globby';
import formatPath from './formatPath';
import formatPluginDir from './formatPluginDir';

//  https://regexr.com/47jlq
const importRegex = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:"(.*?)")|(?:'(.*?)'))[\s]*?(?:;|$|)/;

export default (plugins: any = [], targetDir: string, hasJsxRuntime: boolean) => {
  const analyzeMap = new Set();
  const sourceCache = new Map();
  function removeReactStatement(sourceCode: string) {
    let replacedCode = sourceCode;
    // match: import React from 'react'; import * as React from 'react';
    const defaultImportRegex = /([\w\W]*)?(\n?import\s+(?:\*\s+as\s+)?React\s+from\s+['"]react['"];?\n?)([\w\W]*)/;
    // match: import React, { useState } from 'react';
    const namedImport = /([\w\W]*import\s+(?:[\w*\s{}]*)?\s?)(,?\s?React\s?,?\s?){1}((?:[\w*\s{}]*)?\s+from\s+['"]react['"];?[\w\W]*)/;
    let matched = false;
    const replacer = (match: string, p1: string|undefined, p2: string|undefined, p3: string|undefined) => {
      if (p2) {
        matched = true;
        return `${p1 || ''}${p3 || ''}`;
      }
      return match;
    };
    replacedCode = replacedCode.replace(defaultImportRegex, replacer);
    if (!matched) {
      replacedCode = replacedCode.replace(namedImport, replacer);
    }
    return replacedCode;
  }

  function analyzeRelativePath(filePath: string, relativeFiles: string[]) {
    const source = fse.readFileSync(filePath, 'utf-8');
    sourceCache.set(filePath, source);
    const matches = source.match(new RegExp(importRegex, 'g'));
    let imports: string[] = [];
    if (matches) {
      imports = matches.map((matchStr) => {
        const [, singleQuoteImporter, doubleQuoteImporter] = matchStr.match(importRegex);
        const importer = singleQuoteImporter || doubleQuoteImporter;
        // compatible with `import xx from '.';`
        return importer === '.' ? './index' : importer;
      }).filter(Boolean);
    }
    imports.forEach((importName) => {
      if (importName.startsWith('.')) {
        const importPath = formatPath(path.join(path.dirname(filePath), importName));
        const basename = path.basename(importPath);
        // escape user folder with parentheses and spaces by glob file basename
        const importFile = globby.sync(path.extname(importPath) ? basename : [`${basename}.@((t|j)s?(x))`, `${basename}/index.@((t|j)s?(x))`],
          {
            cwd: path.dirname(importPath),
            absolute: true,
          },
        );
        if (importFile.length > 0) {
          relativeFiles.push(importFile[0]);
          if (!analyzeMap.has(importFile[0])) {
            analyzeMap.add(importFile[0]);
            analyzeRelativePath(importFile[0], relativeFiles);
          }
        } else {
          throw new Error(`can not find module ${importName}`);
        }
      }
    });
  }

  return plugins.map(({ pluginPath, name }) => {
    // compatible with function plugin
    if (!pluginPath) return false;
    // NOTE: module.js will be discarded in future.
    const pluginDir = path.dirname(pluginPath);
    // compatible with output file extension of .jsx
    let [absoluteModulePath] = globby.sync('runtime.@((t|j)s?(x))', { cwd: pluginDir, absolute: true });
    let modulePath = absoluteModulePath;
    const moduleDir = path.join(pluginDir, '..');
    if(!absoluteModulePath){
      // filter plugin without runtime
      return false;
    } else if (name){
      // copy module dir to target dir
      const tempDir = path.join(targetDir, 'plugins', formatPluginDir(name), 'pluginRuntime');
      // ensure source dir
      const srcDir = path.join(moduleDir, 'src');
      if (fse.existsSync(srcDir)) {
        const runtimePaths = globby.sync('runtime.@((t|j)s?(x))', { cwd: srcDir });
        if (runtimePaths.length > 0) {
          const runtimeFilePath = path.join(srcDir, runtimePaths[0]);
          const relativeFiles = [];
          analyzeRelativePath(runtimeFilePath, relativeFiles);
          // copy source code when runtime exists
          [runtimeFilePath, ...relativeFiles].forEach((filePath) => {
            let targetPath = '';
            if (filePath !== runtimeFilePath) {
              targetPath = path.join(tempDir, path.relative(path.dirname(runtimeFilePath), path.dirname(filePath)), path.basename(filePath));
            } else {
              targetPath = path.join(tempDir, path.basename(runtimeFilePath));
            }
            fse.ensureDirSync(path.dirname(targetPath));
            if (hasJsxRuntime) {
              // remove React import when jsx runtime is enabled
              const sourceCode = removeReactStatement(sourceCache.get(filePath) || fse.readFileSync(filePath, 'utf8'));
              fse.writeFileSync(targetPath, sourceCode);
            } else {
              fse.copySync(filePath, targetPath);
            }
          });
          absoluteModulePath = path.join(tempDir, runtimePaths[0]).replace(/.(t|j)(s|sx)$/, '');
          modulePath = `../${path.relative(targetDir, absoluteModulePath)}`;
        }
      }
    }
    // read package.json
    let pluginConfig = {};
    const pkgPath = path.join(moduleDir, 'package.json');
    try {
      pluginConfig = fse.readJSONSync(pkgPath).pluginConfig;
    } catch(error) {
      console.log(`ERROR: fail to load package.json of plugin ${name}`);
    }
    return {
      pluginConfig,
      modulePath: formatPath(modulePath),
      absoluteModulePath: formatPath(absoluteModulePath),
      name,
    };
  })
    .filter(Boolean)
    .map(({ modulePath, pluginConfig, name, absoluteModulePath }) => {
      const staticModule = (pluginConfig && pluginConfig.staticModule) || false;
      return {
        staticModule,
        path: modulePath,
        absoluteModulePath,
        name,
      };
    });
};
