/**
 * Redux 项目文件映射表
 * 根据不同的模块划分对应的文件目录
 * 根据用户输入的数据进行组装
 * 生成用户项目模板
 */
const REDUX_TEMPLATE_FILE_MAPPING = {
  mockModule: ['mock/index.js'],
  enabled: [
    'src/configureStore.js',
    'src/reducers.js',
    'src/utils/checkStore.js',
    'src/utils/injectReducer.js',
    'src/utils/reducerInjectors.js',
  ],
  authorityModule: [
    'src/components/Exception/*',
    'src/components/Authorized/*',
    'src/utils/authority.js',
    'src/utils/Authorized.js',
  ],
  registerLoginModule: [
    'src/store/*',
    'src/pages/UserLogin/*',
    'src/pages/UserRegister/*',
    'src/layouts/UserLayout/*',
    'src/layouts/BasicLayout/BasicLayoutHoc.jsx',
    'src/api/index.js',
    'mock/index.js',
  ],
  baseFiles: [
    'src/layouts/BasicLayout/MainRoutes.jsx',
    'src/pages/Dashboard/*',
    'src/components/NotFound/*',
    'src/utils/formatter.js',
    'src/index.js',
    'src/menuConfig.js',
    'src/router.jsx',
    'src/routerConfig.js',
    'public/*',
    'tests/*',
    '_editorconfig',
    '_eslintignore',
    '_eslintrc',
    '_gitignore',
    '_package.json',
    'README.md',
  ],
};

module.exports = REDUX_TEMPLATE_FILE_MAPPING;
