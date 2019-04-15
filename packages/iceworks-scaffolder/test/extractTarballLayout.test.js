const path = require('path');
const del = require('del');

const material = require('../src/material');

describe('提取 layout 文件', () => {
  test('更换目录', () => {
    const cwd = path.join(__dirname, './features/layout');
    return del([path.join(cwd, 'src')])
      .then(() => {
        return material.extractTarballLayout({
          url:
            'http://registry.npm.alibaba-inc.com/@icedesign/header-aside-footer-layout/download/@icedesign/header-aside-footer-layout-0.2.0.tgz',
          output: path.join(cwd, 'src/layout'),
          projectDir: cwd,
        });
      })
      .then((allFiles) => {
        expect(allFiles).toEqual([
          path.join(cwd, '/src/components/Footer.jsx'),
          path.join(cwd, '/src/components/Header.jsx'),
          path.join(cwd, '/src/components/Logo.jsx'),
          path.join(cwd, '/src/menuConfig.js'),
          path.join(cwd, '/src/layout/index.js'),
          path.join(cwd, '/src/layout/Layout.jsx'),
          path.join(cwd, '/src/layout/scss/base.scss'),
          path.join(cwd, '/src/layout/scss/dark.scss'),
          path.join(cwd, '/src/layout/scss/light.scss'),
        ]);
      });
  });
});
