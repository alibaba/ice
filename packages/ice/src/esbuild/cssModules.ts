import * as path from 'path';
import fse from 'fs-extra';
import temp from 'temp';
import cssModules from '@ice/bundles/compiled/postcss-modules/index.js';
import { less, sass, postcss } from '@ice/bundles';
import type { Plugin, PluginBuild, OnResolveArgs, OnResolveResult, OnLoadArgs, OnLoadResult } from 'esbuild';

const cssModulesStyleFilter = /\.module\.(css|sass|scss|less)$/;
const CSS_LOADER_NAMESPACE = 'css-loader-namespace';
const STYLE_HANDLER_NAMESPACE = 'style-handler-namespace';

type GenerateScopedNameFunction = (name: string, filename: string, css: string) => string;

interface PluginOptions {
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
      build.onResolve({ filter: cssModulesStyleFilter }, onResolve);

      build.onLoad({ filter: /.*/, namespace: STYLE_HANDLER_NAMESPACE }, onStyleLoad(options));

      build.onLoad({ filter: /.*/, namespace: CSS_LOADER_NAMESPACE }, onCSSLoad);
    },
  };
};

async function onResolve(args: OnResolveArgs): Promise<OnResolveResult> {
  const { namespace, resolveDir } = args;
  const absolutePath = path.resolve(resolveDir, args.path);
  // This is the import in the `STYLE_HANDLER_NAMESPACE` namespace.
  // Put the path in the `CSS_LOADER_NAMESPACE` namespace to tell esbuild to load the css file.
  if (namespace === STYLE_HANDLER_NAMESPACE) {
    return {
      path: absolutePath,
      namespace: CSS_LOADER_NAMESPACE,
    };
  }
  // Otherwise, generate css and put it in the `STYLE_HANDLER_NAMESPACE` namespace to handle css file
  return {
    path: absolutePath,
    namespace: STYLE_HANDLER_NAMESPACE,
  };
}

async function onCSSLoad(args: OnLoadArgs): Promise<OnLoadResult> {
  const data = (await fse.readFile(args.path)).toString();
  return {
    contents: data,
    loader: 'css',
  };
}

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
    contents += `export default ${data.exportedClasses};`;

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
    return (await sass.compileStringAsync(content)).css;
  }

  if (ext === '.less') {
    return (await less.render(content)).css;
  }

  throw new Error(`Can't parse the style '${ext}'.`);
}

export default cssModulesPlugin;
