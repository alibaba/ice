const path = require('path');
const getEntryName = require('./getEntryName');

const appRegexp = /^app\.(t|j)sx?$/;

function getMpaRoutes(config) {
  const routes = [];
  const distDir = config.output.get('path');
  const filename = config.output.get('filename');
  const mpaEntries = config.toConfig().entry;

  Object.keys(mpaEntries).forEach(entryName => {
    const entryBasename = path.basename(mpaEntries[entryName][0]);
    const entryDirname = path.dirname(mpaEntries[entryName][0]);
    if (appRegexp.test(entryBasename)) {
      // eslint-disable-next-line
      const staticConfig = require(`${entryDirname}/app.json`);
      staticConfig.routes.forEach(route => {
        routes.push({
          path: `/${entryName}.html`,
          source: route.source,
          entryName: getEntryName(route.path),
          componentPath: distDir && filename ? path.join(distDir, filename.replace('[name]', entryName)) : ''
        });
      });
    }
  });

  return routes;
}

module.exports = getMpaRoutes;
