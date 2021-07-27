import * as path from 'path';
import * as fse from 'fs-extra';
import { redirectImport, formatPath } from '@builder/app-helpers';
import { getOptions } from 'loader-utils';
import { SourceMap } from 'module';

const LAYOUT_DIR = 'Layout';

export default function (content: string, sourceMap: SourceMap) {
  // async loader
  const callback = this.async();
  this.cacheable();

  loader.call(this, content, sourceMap).then(
    args => callback(null, ...args),
    (err: Error) => callback(err),
  );
}

async function loader(content: string, sourceMap: SourceMap) {
  const { alias, tempDir, pagesName, rootDir, routesPath } = getOptions(this);
  const currentRoutesPath = this.resourcePath;
  if (!routesPath.includes(currentRoutesPath)) {
    // if this.resourcePath === htmlWebpackPluginPublicPath, skip it
    return [content, sourceMap];
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const pageName of pagesName) {
    const absolutePagePath = path.join(rootDir, 'src', 'pages', pageName);
    const absolutePageLayoutPath = path.join(absolutePagePath, LAYOUT_DIR);

    const source = (originSourcePath: string) => {
      const originSourceBasename = path.basename(originSourcePath);
      if (['index', 'index.js'].includes(originSourceBasename)) {
        // ./pages/Home/index.js -> ./pages/Home
        // .pages/Home/index -> ./pages/Home
        originSourcePath = path.dirname(originSourcePath);
      }
      if (!Object.keys(alias).length) {
        alias['@'] = 'src';
      }
      let matchAliasKey = '';
      Object.keys(alias).forEach((aliasKey: string) => {
        if (new RegExp(aliasKey).test(originSourcePath)) {
          matchAliasKey = aliasKey;
        }
      });

      let absoluteSourcePath: string;
      if (matchAliasKey) {
        // handle alias path
        const matchAliasPath: string = alias[matchAliasKey]; // .src/*
        const replaceWithAliasPath = originSourcePath.replace(RegExp(matchAliasKey), matchAliasPath.replace(/\*/g, ''));
        absoluteSourcePath = path.join(rootDir, replaceWithAliasPath);
      } else {
        // handle relative path
        const currentRoutesDir = path.dirname(currentRoutesPath);
        absoluteSourcePath = path.join(currentRoutesDir, originSourcePath);
      }

      return absoluteSourcePath === absolutePagePath || absoluteSourcePath === absolutePageLayoutPath;
    };

    // eslint-disable-next-line no-await-in-loop
    content = await redirectImport(content, {
      source,
      redirectImports: [
        {
          redirectPath: generateRedirectPath({ tempDir, pageName, rootDir }),
          default: true,
        }
      ]
    });
  }

  return [content, sourceMap];
}

function generateRedirectPath({ tempDir, pageName, rootDir }) {
  if (fse.pathExistsSync(path.join(rootDir, 'src', 'pages', pageName, LAYOUT_DIR))) {
    return formatPath(path.join(rootDir, tempDir, 'pages', pageName, LAYOUT_DIR));
  }
  const pagePath = path.join(rootDir, tempDir, 'pages', pageName, 'index.tsx');
  return formatPath(pagePath);
}
