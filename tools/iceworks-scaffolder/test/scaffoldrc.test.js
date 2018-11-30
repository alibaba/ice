const path = require('path');

const normalizeScaffoldrc = require('../src/normalizeScaffoldrc');

describe('Scaffold runtime config', () => {
  test('获取默认配置', () => {
    const cwd = path.join(__dirname, './features/default/');
    const userScaffoldrd = normalizeScaffoldrc(cwd);

    expect(userScaffoldrd).toEqual({
      menuConfigFilePath: path.join(cwd, 'src/menuConfig.js'),
      routerConfigFilePath: path.join(cwd, 'src/routerConfig.js'),
      templates: {
        pageFolder: path.join(cwd, '.iceworks/pageTemplate/'),
      },
      version: '0.1.0',
    });
  });

  test('获取默认配置 为空', () => {
    const userScaffoldrd = normalizeScaffoldrc(__dirname);

    expect(userScaffoldrd).toEqual(undefined);
  });
});
