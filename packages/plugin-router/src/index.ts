import * as path from 'path';
import { IRouterOptions } from './types/router';
import walker from './collector/walker';
import vitePluginLazy from './vitePluginLazy';

// compatible with $ice/routes
const TEM_ROUTER_COMPATIBLE = '$ice/routes';
const TEM_ROUTER_SETS = [TEM_ROUTER_COMPATIBLE];

const plugin = ({ context, onGetWebpackConfig, modifyUserConfig, getValue, applyMethod, log }) => {
  const { rootDir, userConfig, command } = context;

  // [enum] js or ts
  const projectType = getValue('PROJECT_TYPE');

  // .tmp path
  const iceTempPath = getValue('TEMP_PATH');
  const routerOptions = (userConfig.router || {}) as IRouterOptions;
  const { configPath } = routerOptions;
  const { mpa: isMpa } = userConfig;
  const routesTempPath = path.join(iceTempPath, `routes.${projectType}`);
  const srcDir = applyMethod('getSourceDir', userConfig.entry);
  // MPA 下 isConfigRoutes 永远是 true
  const { routesPath, isConfigRoutes } = applyMethod('getRoutes', {
    rootDir,
    tempPath: iceTempPath,
    configPath,
    projectType,
    isMpa,
    srcDir
  });

  if (!isConfigRoutes) {
    log.info('开启文件约定式路由能力');
  }

  // modify webpack config
  onGetWebpackConfig((config) => {
    // add alias
    TEM_ROUTER_SETS.forEach(i => {
      config.resolve.alias.set(i, routesPath);
    });
    // alias for runtime/Router
    config.resolve.alias.set('$ice/Router', path.join(iceTempPath, 'plugins/router/pluginRuntime/runtime/Router.tsx'));

    // alias for runtime/history
    config.resolve.alias.set('$ice/history', path.join(iceTempPath, 'plugins/router/history.ts'));

    // alias for react-router-dom
    const routerName = 'react-router-dom';
    const packagePath = require.resolve(`${routerName}/package.json`);
    // use react-router-dom path while react-router-dom has module field in package.json
    config.resolve.alias.set(routerName, path.dirname(packagePath));

    // config historyApiFallback for router type browser
    if (!config.devServer.get('historyApiFallback')) {
      config.devServer.set('historyApiFallback', true);
    }
  });

  // copy types
  applyMethod('addPluginTemplate', {
    template: path.join(__dirname, '../src/types'),
    targetDir: 'router/types',
  });

  // set IAppRouterProps to IAppConfig
  applyMethod('addAppConfigTypes', { source: '../plugins/router/types', specifier: '{ IAppRouterProps }', exportName: 'router?: IAppRouterProps' });
  // export IRouterConfig to the public
  applyMethod('addTypesExport', { source: '../plugins/router/types' });
  // add import declarations
  applyMethod('addImportDeclaration', {
    importSource: '$$ice/plugins/router/types',
    exportMembers: ['IAppRouterProps', 'IRouterConfig'],
  });

  // add babel plugins for ice lazy
  modifyUserConfig('babelPlugins',
    [
      ...(userConfig.babelPlugins as [] || []),
      [
        require.resolve('./babelPluginLazy'),
        { routesPath }
      ]
    ]
  );

  // if mode vite, add vite plugin for transform lazy
  if (userConfig.vite) {
    modifyUserConfig('vite.plugins', [vitePluginLazy(routesPath)], { deepmerge: true });
  }

  // copy templates and export react-router-dom/history apis to ice
  const routerTemplatesPath = path.join(__dirname, '../templates');
  applyMethod('addPluginTemplate', routerTemplatesPath);
  applyMethod('addExport', {
    source: './plugins/router',
    importSource: '$$ice/plugins/router',
    exportMembers: [
      'createBrowserHistory',
      'createHashHistory',
      'createMemoryHistory',
      // react-router-dom
      'Link',
      'NavLink',
      'Prompt',
      'Redirect',
      'Route',
      'Switch',
      'matchPath',
      'generatePath',
      // hooks
      'useHistory',
      'useLocation',
      'useParams',
      'useRouteMatch'
    ]
  });

  if (!isConfigRoutes) {
    // 文件约定路由
    const routerMatch = 'src/pages';
    const pagesDir = path.join(rootDir, routerMatch);
    const walkerOptions = { rootDir, routerOptions, routesTempPath, pagesDir };
    walker(walkerOptions);
    log.verbose('根据 src/pages 结构生成路由配置：', routesTempPath);

    if (command === 'start') {
      // watch folder change when dev
      applyMethod('watchFileChange', routerMatch, () => {
        walker(walkerOptions);
        log.verbose('监听到 src/pages 目录变化，重新生成路由配置：', routesTempPath);
      });
    }
  }
};

export default plugin;
