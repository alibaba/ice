const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');
const prettier = require('prettier');
const util = require('util');
const vm = require('vm');

const InteractiveFileReplacement = require('./interactiveFileReplacement');
const routes = require('./routes');
const config = require('../../config');

const ROUTE_BLACK_LIST = ['*', '404', '502'];

module.exports = async function({
  clientPath,
  routePath,
  routeText,
  routeIcon, // 用于生成导航栏左侧 icon
  pageName, // 用于生成导航栏左侧 icon
  routeFilePath,
  pageFolderName,
  layoutClassName,
  preview,
  builtIn,
}) {
  if (pathExists.sync(routeFilePath)) {
    const routeReplacement = new InteractiveFileReplacement({
      file: routeFilePath,
      tagPrefix: '// <!-- auto generated routes start -->',
      tagSuffix: '// <!-- auto generated routes end -->',
    });

    const ast = routes._parseRoute(routeReplacement.getFileContent());
    routes.addImports(ast.program.body, [
      {
        type: 'page',
        ref: pageFolderName,
      },
      {
        type: 'layout',
        ref: layoutClassName,
      },
    ]);

    routes.addRoute(ast.program.body, {
      path: routePath,
      childRoutes: [],
      component: 'id ' + layoutClassName,
      indexRoute: {
        component: 'id ' + pageFolderName,
      },
    });
    const { code } = routes._generateRoute({
      type: 'Program',
      body: ast.program.body,
    });
    // 需要替换的代码需要经过 prettier 以获得标准的 lint 语法
    routeReplacement.replace(prettier.format(code, config.prettier));
  }

  // 更新 navs 导航信息
  // 兼容 config/navs.json
  let navsRealFilePath = '';
  let isNavsFileLegacy = false;
  let navsFileReplacement;
  const navsFileLegacyPath = path.join(clientPath, 'src/config/navs.json');
  const navsFilePath = path.join(clientPath, 'src/navs.js');
  // 由于 vue 等私有化物料可能没有 navs.js 这个文件，所以判断绕过
  let enableNavsGenerate = false;

  if (fs.existsSync(navsFileLegacyPath)) {
    navsRealFilePath = navsFileLegacyPath;
    isNavsFileLegacy = true;
    enableNavsGenerate = true;
  }

  if (!isNavsFileLegacy && fs.existsSync(navsFilePath)) {
    enableNavsGenerate = true;
    navsRealFilePath = navsFilePath;
    navsFileReplacement = new InteractiveFileReplacement({
      file: navsFilePath,
      tagPrefix: '// <!-- auto generated navs start -->',
      tagSuffix: '// <!-- auto generated navs end -->',
    });
  }

  // 当 navs 文件真实存在才会写入
  // todo 可以优化
  if (enableNavsGenerate) {
    const navsContents = fs.readFileSync(navsRealFilePath);
    let navsJsonData;

    if (isNavsFileLegacy) {
      try {
        navsJsonData = JSON.parse(navsContents);
      } catch (e) {
        navsJsonData = {
          headerNavs: [],
          asideNavs: [],
        };
      }
    } else {
      // get navs json data from js
      const fileContent = navsFileReplacement.getFileContent();
      const sandbox = {};
      vm.createContext(sandbox);
      try {
        vm.runInContext(
          `${fileContent}\nvar result = {autoGenHeaderNavs,autoGenAsideNavs};`,
          sandbox
        );
      } catch (err) {
        sandbox.result = {};
      }

      navsJsonData = {
        headerNavs: sandbox.result.autoGenHeaderNavs || [],
        asideNavs: sandbox.result.autoGenAsideNavs || [],
      };
    }

    if (!preview && !builtIn) {
      // 添加路由到文件里
      const prefixSlash = routePath.startsWith('/');
      let routeTo = prefixSlash ? routePath : `/${routePath}`;
      // 如果 routeTo = '/foo/:fooId' 替换成 '/foo/1'
      routeTo = routeTo
        .split('/')
        .map((part) => {
          if (part && part[0] === ':') {
            if (/id/i.test(part)) {
              return '1';
            } else {
              return part.replace(/^:/, '');
            }
          } else {
            return part;
          }
        })
        .join('/');
      const hasSameRoute = navsJsonData.asideNavs.some((r) => {
        return r.to === routeTo;
      });
      const inHeaderNav = navsJsonData.headerNavs.some((r) => {
        return r.to === routeTo;
      });
      const routeConfig = {
        text: routeText || pageName,
        to: routeTo,
        icon: routeIcon || 'nav-list',
      };
      if (routePath !== '/' && routeText && !inHeaderNav) {
        if (hasSameRoute) {
          navsJsonData.asideNavs = navsJsonData.asideNavs.map((r) => {
            return r.to === routeTo ? routeConfig : r;
          });
        } else if (ROUTE_BLACK_LIST.indexOf(routePath) > -1) {
          // 白名单里的不添加到左侧导航中
        } else {
          navsJsonData.asideNavs.push(routeConfig);
        }
      }
    }

    if (isNavsFileLegacy) {
      fs.writeFileSync(navsFilePath, JSON.stringify(navsJsonData, null, 2));
    } else {
      navsFileReplacement.replace(
        prettier.format(
          `const autoGenHeaderNavs = ${util.inspect(navsJsonData.headerNavs, {
            showHidden: false,
            depth: null,
          })};
          const autoGenAsideNavs = ${util.inspect(navsJsonData.asideNavs, {
            showHidden: false,
            depth: null,
          })};`,
          config.prettier
        )
      );
    }
  }
};
