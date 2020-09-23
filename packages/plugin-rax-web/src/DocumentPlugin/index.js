const qs = require('qs');
const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const { RawSource } = require('webpack-sources');
const { handleWebpackErr } = require('rax-compile-config');
const { parse, print } = require('error-stack-tracey');

const PLUGIN_NAME = 'DocumentPlugin';

module.exports = class DocumentPlugin {
  constructor(options) {
    /**
     * An plugin which generate HTML files
     * @param {object} options
     * @param {object} options.context build plugin context
     * @param {object[]} options.pages pages need to generate HTML
     * @param {string} options.pages[].entryName
     * @param {string} options.pages[].path  page path for MPA to get pageInfo in route config
     * @param {string} options.pages[].source page source for static export
     * @param {boolean} [options.staticExport] static exporting
     * @param {string} [options.loader] custom document loader
     * @param {string} [options.publicPath] for internal weex publish
     * @param {function} [options.configWebpack] custom webpack config for document
     */
    this.options = options;
  }

  apply(compiler) {
    const { context, ...options} = this.options;
    const { rootDir } = context;
    const { webpackConfig } = options;

    const mainConfig = compiler.options;

    // Get output dir from filename instead of hard code.
    const outputFilePrefix = getPathInfoFromFileName(mainConfig.output.filename);
    const publicPath = options.publicPath ? options.publicPath : mainConfig.output.publicPath;

    const pages = {};

    // Get all entry point names for html file
    Object.keys(mainConfig.entry).map(entryName => {
      pages[entryName] = {
        tempFile: `__${entryName.replace(/\//g, '_')}_document`,
        fileName: `${outputFilePrefix}${entryName}.html`
      };
    });

    // Merge the page info from options
    if (options.pages) {
      options.pages.map(page => {
        const pageInfo = pages[page.entryName];
        if (pageInfo) {
          Object.assign(pageInfo, {
            pagePath: page.path,
            source: page.source
          });
        }
      });
    }

    // Support custom loader
    const loaderForDocument = options.loader || require.resolve('./loader');

    // Document path is specified
    const absoluteDocumentPath = getAbsoluteFilePath(rootDir, 'src/document/index');

    // Shell is enabled by config in app.json, so it can be disabled without delete code
    const appConfig = fs.readJsonSync(path.join(rootDir, 'src/app.json'));
    const shellPath = appConfig.shell && appConfig.shell.source;
    const absoluteShellPath = shellPath ? getAbsoluteFilePath(rootDir, path.join('src', shellPath)) : null;
    const manifestString = options.manifests ? JSON.stringify(options.manifests) : null;

    delete webpackConfig.entry.index;
    // Add ssr loader for each entry
    Object.keys(pages).map((entryName) => {
      const pageInfo = pages[entryName];
      const { tempFile, source, pagePath } = pageInfo;

      const absolutePagePath = options.staticExport && source ? getAbsoluteFilePath(rootDir, path.join('src', source)) : '';

      const query = {
        absoluteDocumentPath,
        absoluteShellPath,
        absolutePagePath,
        pagePath,
        doctype: options.doctype,
      };

      if (manifestString) {
        query.manifests = manifestString;
      }

      if (!webpackConfig.entry[tempFile]) {
        webpackConfig.entry[tempFile] = [];
      }
      webpackConfig.entry[tempFile].push(`${loaderForDocument}?${qs.stringify(query)}!${absoluteDocumentPath}`);
    });

    let cachedHTML = {};

    let fileDependencies = [];

    /**
     * Make Document change can trigger dev server reload
     * Executed while initializing the compilation, right before emitting the compilation event.
     * Add file dependencies of child compiler to parent compiler to keep them watched
     */
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.additionalChunkAssets.tap(PLUGIN_NAME, () => {
        const childCompilerDependencies = fileDependencies;

        childCompilerDependencies.forEach(fileDependency => {
          compilation.compilationDependencies.add(fileDependency);
        });
      });
    });

    let lastHash;
    let currentHash;

    // Executed before finishing the compilation.
    compiler.hooks.make.tapAsync(PLUGIN_NAME, (mainCompilation, callback) => {
      /**
       * Need to run document compiler as a child compiler, so it can push html file to the web compilation assets.
       * Because there are other plugins get html file from the compilation of web.
       */
      const childCompiler = webpack(webpackConfig);
      childCompiler.parentCompilation = mainCompilation;

      // Run as child to get child compilation
      childCompiler.runAsChild((err, entries, childCompilation) => {
        if (err) {
          handleWebpackErr(err);
        } else {
          fileDependencies = childCompilation.fileDependencies;
        }

        lastHash = currentHash;
        currentHash = childCompilation.hash;
        callback();
      });
    });

    // Render into index.html
    compiler.hooks.emit.tapAsync(PLUGIN_NAME, async(compilation, callback) => {
      // Render document to html only when hash change to avoid memory leak.
      if (currentHash !== lastHash) {
        cachedHTML = await generateHtml(compilation, {
          pages,
          publicPath
        });
      }

      for (const page in cachedHTML) {
        compilation.assets[page] = cachedHTML[page];
      }

      callback();
    });
  }
};

async function generateHtml(compilation, options) {
  const { pages, publicPath } = options;
  const entries = Object.keys(pages);

  let hasPrintError = false;

  const htmlMap = {};
  for (let i = 0, l = entries.length; i < l; i++) {
    const entryName = entries[i];
    const { tempFile, fileName } = pages[entryName];

    const files = compilation.entrypoints.get(entryName).getFiles();
    const assets = getAssetsForPage(files, publicPath);

    const documentContent = compilation.assets[`${tempFile}.js`].source();

    let pageSource;

    try {
      const Document = loadDocument(documentContent);
      pageSource = Document.renderToHTML(assets);
    } catch (error) {
      const errorStack = await parse(error, documentContent);
      // Prevent print duplicate error info
      if (!hasPrintError) {
        print(error.message, errorStack);
        hasPrintError = true;
      }

      const stackMessage = errorStack.map(frame => {
        if (frame.fromSourceMap) {
          return `at ${frame.functionName} (${frame.source}:${frame.lineNumber}:${frame.columnNumber})`;
        }
        // the origin source info already has position info
        return frame.source;
      });
      pageSource = `Error: ${error.message}<br>&nbsp;&nbsp;${stackMessage.join('<br>&nbsp;&nbsp;')}`;
    }

    htmlMap[fileName] = new RawSource(pageSource);

    delete compilation.assets[`${tempFile}.js`];
  }

  return htmlMap;
}

/**
 * Get path info from the output filename
 * 'web/[name].js' => 'web/'
 * '[name].js' => ''
 * @param {*} fileName webpack output file name
 */
function getPathInfoFromFileName(fileName) {
  const paths = fileName.split('/');
  paths.pop();
  return paths.length ? `${paths.join('/')  }/` : '';
}

/**
 * Load Document after webpack compilation
 * @param {*} content document output
 */
function loadDocument(content) {
  const tempFn = new Function('require', 'module', content); // eslint-disable-line
  const tempModule = { exports: {} };
  tempFn(require, tempModule);
  if (Object.keys(tempModule.exports).length === 0) {
    throw new Error('Please make sure exports document component!');
  }

  return tempModule.exports;
}

/**
 * get assets from webpack outputs
 * @param {*} files [ 'web/detail.css', 'web/detail.js' ]
 * @param {*} publicPath
 */
function getAssetsForPage(files, publicPath) {
  const jsFiles = files.filter(v => /\.js$/i.test(v));
  const cssFiles = files.filter(v => /\.css$/i.test(v));

  return {
    // Support publicPath use relative path.
    // Change MPA 'pageName/index.js' to 'index.js', when use relative path.
    scripts: jsFiles.map(script => publicPath + (publicPath.startsWith('.') ? path.basename(script) : script)),
    styles: cssFiles.map(style => publicPath + (publicPath.startsWith('.') ? path.basename(style) : style)),
  };
}

/**
 * Get the exact file
 * @param {*} rootDir '/Document/work/code/rax-demo/'
 * @param {*} filePath 'src/shell/index'
 */
function getAbsoluteFilePath(rootDir, filePath) {
  const exts = ['.js', '.jsx', '.tsx'];

  const files = exts.map((ext) => {
    return `${path.join(rootDir, filePath)}${ext}`;
  });

  return files.find((f) => fs.existsSync(f));
}
