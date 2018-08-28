const { generatorTemplate } = require('../index');

const CONFIG = {
  name: 'app',
  directory: __dirname,
  mockModule: true,
  reduxModule: true,
  authorityModule: true,
  registerLoginModule: true,
};

generatorTemplate(CONFIG)
  .then((res) => {
    console.log('生成成功：', res);
  })
  .catch((err) => {
    console.log('生成失败：', err);
  });
