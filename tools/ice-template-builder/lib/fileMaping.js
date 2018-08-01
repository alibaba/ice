/**
 * 文件映射表
 * 根据不同的模块划分对应的文件目录
 * 根据用户输入的数据进行组装
 * 生成用户项目模板
 */
const FILE_MAPPING = {
  mockModule: ['mock/index.js'],
  reduxModule: [
    'src/configureStore.js',
    'src/reducers.js',
    'src/utils/checkStore.js',
    'src/utils/injectReducer.js',
    'src/utils/reducerInjectors.js',
  ],
  authorityModule: [
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
    'src/layouts/BasicLayout/scss/*',
    'src/layouts/BasicLayout/BasicLayout.jsx',
    'src/layouts/BasicLayout/MainRoutes.jsx',
    'src/layouts/BasicLayout/index.js',
    'src/pages/Dashboard/*',
    'src/pages/NotFound/*',
    'src/components/Aside/*',
    'src/components/Exception/*',
    'src/components/Header/*',
    'src/components/Footer/*',
    'src/components/Logo/*',
    'src/components/NotFound/*',
    'src/utils/utils.js',
    'src/index.js',
    'src/menuConfig.js',
    'src/router.jsx',
    'src/routerConfig.js',
    'public/*',
    'tests/*',
    '.editorconfig',
    '.eslintignore',
    '.eslintrc',
    '.gitignore',
    'package.json',
    'README.md',
  ],
};

module.exports = FILE_MAPPING;
