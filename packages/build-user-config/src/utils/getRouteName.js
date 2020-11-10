const path = require('path');
const fs = require('fs-extra');

module.exports = (route, rootDir) => {
  if (route.name) {
    return route.name;
  }

  const appConfig = fs.readJsonSync(path.resolve(rootDir, 'src/app.json'));

  const routeName = appConfig.routeName ? appConfig.routeName : 'path';

  if (routeName === 'path') {
    return route.source.replace(/\//g, '_');
  }

  if (routeName === 'pages') {
    try {
      // get Home from pages/Home/index or pages/Home
      const name = route.source.match(/pages\/([^/]*)/);
      return name[1];
    } catch (e) {
      console.error('"routeName": "pages" mode request routes in /pages directory');
      process.exit(1);
    }
  }
};
