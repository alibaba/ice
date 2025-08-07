import * as path from 'path';
import url from 'url';
import fse from 'fs-extra';
import temp from 'temp';
import cssModules from '@ice/bundles/compiled/postcss-modules/index.js';
import { less, sass, postcss } from '@ice/bundles';
import type { Plugin, PluginBuild, OnResolveArgs, OnLoadArgs, OnLoadResult } from 'esbuild';
import { resolveId } from '../service/analyze.js';
import type { AliasWithEmpty } from '../service/analyze.js';

const cssModulesStyleFilter = /\.module\.(css|sass|scss|less)$/;
const STYLE_HANDLER_NAMESPACE = 'style-handler-namespace';

type GenerateScopedNameFunction = (name: string, filename: string, css: string) => string;

interface PluginOptions {
  alias: AliasWithEmpty;
  /** extract css files, default is true */
  extract?: false;
  /** css classname identifier default is `[hash:base64]` */
  localIdentName?: string;
  /** the function to generate css classname */
  generateLocalIdentName?: GenerateScopedNameFunction;
}

const cssModulesPlugin = (options: PluginOptions): Plugin => {
  return {
    name: 'esbuild-css-modules',
    setup: async (build: PluginBuild) => {
      build.onResolve({ filter: cssModulesStyleFilter }, (args: OnResolveArgs) => {
        const { resolveDir } = args;
        const resolvePath = args.path ? resolveId(args.path, options.alias) : '';
        const absolutePath = path.resolve(resolveDir, resolvePath && typeof resolvePath === 'string' ? resolvePath : args.path);
        // Generate css and put it in the `STYLE_HANDLER_NAMESPACE` namespace to handle css file
        return {
          path: absolutePath,
          namespace: STYLE_HANDLER_NAMESPACE,
        };
      });

      build.onLoad({ filter: /.*/, namespace: STYLE_HANDLER_NAMESPACE }, onStyleLoad(options));
    },
  };
};

/**
 * parse less/scss/css-modules to css
 */
function onStyleLoad(options: PluginOptions) {
  return async function (args: OnLoadArgs): Promise<OnLoadResult> {
    const { localIdentName = '[hash:base64]', generateLocalIdentName } = options;
    const extract = options.extract === undefined ? true : options.extract;

    let css = await parseStyle(args.path);

    const data = { exportedClasses: '' };
    let contents = '';

    // parse css modules to css
    const postcssPlugins = [
      cssModules({
        generateScopedName: generateLocalIdentName || localIdentName,
        getJSON: (cssFilename, json) => {
          // Save exported classes
          data.exportedClasses = JSON.stringify(json, null, 2);
        },
      }),
    ];
    const result = await postcss(postcssPlugins).process(css, { from: args.path });
    css = result.css;
    contents += `module.exports = ${data.exportedClasses};`;

    if (extract) {
      const writestream = temp.createWriteStream({ suffix: '.css' });
      writestream.write(css);
      writestream.end();
      // Inject import "new url path" so esbuild can resolve a new css file
      contents += `import ${JSON.stringify(writestream.path)};`;
    }

    return {
      resolveDir: path.dirname(args.path),
      contents,
    };
  };
}

async function parseStyle(filePath: string) {
  const { ext } = path.parse(filePath);
  const content = (await fse.readFile(filePath)).toString();
  if (ext === '.css') {
    return content;
  }

  if (ext === '.scss') {
    return (await sass.compileStringAsync(content, {
      url: url.pathToFileURL(filePath),
    })).css;
  }

  if (ext === '.less') {
    return (await less.render(content, {
      filename: filePath,
    })).css;
  }

  throw new Error(`Can't parse the style '${ext}'.`);
}

export default cssModulesPlugin;
