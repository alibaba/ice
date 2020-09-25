const path = require('path');
const Module = require('module');
const { parse, print } = require('error-stack-tracey');
const getEntryName = require('./getEntryName');

function exec(code, filename, filePath) {
  const module = new Module(filename, this);
  module.paths = Module._nodeModulePaths(filePath);
  module.filename = filename;
  module._compile(code, filename);
  return module.exports;
}

module.exports = (config, context) => {
  const { rootDir } = context;

  config.mode('development');

  const absoluteAppJSONPath = path.join(rootDir, 'src/app.json');
  // eslint-disable-next-line
  const appJSON = require(absoluteAppJSONPath);

  const distDir = config.output.get('path');
  const filename = config.output.get('filename');
  const routes = appJSON.routes;

  routes.forEach((route) => {
    const entryName = getEntryName(route.path);
    route.entryName = entryName;
    route.componentPath = path.join(distDir, filename.replace('[name]', entryName));
  });

  // enable inline soucremap for get error stack
  config.devtool('eval-cheap-source-map');

  config.devServer.hot(false);

  // There can only be one `before` config, this config will overwrite `before` config in web plugin.
  config.devServer.set('before', (app, devServer) => {
    // outputFileSystem in devServer is MemoryFileSystem by defalut, but it can also be custom with other file systems.
    const outputFs = devServer.compiler.compilers[0].outputFileSystem;
    routes.forEach((route) => {
      app.get(route.path, async function(req, res) {
        const bundleContent = outputFs.readFileSync(route.componentPath, 'utf8');

        process.once('unhandledRejection', async(error) => {
          const errorStack = await parse(error, bundleContent);
          print(error.message, errorStack);
        });

        try {
          const mod = exec(bundleContent, route.componentPath, route.componentPath);
          mod.render(req, res);
        } catch (error) {
          console.log('exec error');
          const errorStack = await parse(error, bundleContent);
          print(error.message, errorStack);
        }
      });
    });
  });

  return config;
};
