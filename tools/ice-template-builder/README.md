# Ice Template Builder

在 ICE 中，我们提供了 20+ 套的[模板](https://alibaba.github.io/ice/scaffold)，可以在 [Iceworks](https://alibaba.github.io/ice/iceworks) 的模板界面根据需求选择合适的模板进行初始化项目；然而，这些模板或多或少都有各自的模板特征，并不一定覆盖所有的场景满足你的需求，这便是我们设计`自定义模板`的初衷，支持自定义和自由组合以下功能：

- 自定义布局
- Mock 方案
- Redux 集成
  - 注册/登录
  - 权限组件

## Installation

```bash
$ npm i @icedesign/template-builder -D
```

## Usage

```jsx
const { generatorTemplate } = require('@icedesign/template-builder');

const CONFIG = {
  name: 'app', // 模板名称，默认为 app
  directory: '', // 模板生成目录(必须)
  mockModule: false, //  mock 模块，默认为 false
  reduxModule: false, // redux 模块，默认为 false
  authorityModule: true, // 权限模块，默认为 false
  registerLoginModule: true, // 注册/登录模块，默认为 false
};

// return Promises
generatorTemplate(CONFIG)
  .then((res) => {
    console.log('Successed', res); // return template dependencies/devDependencies
  })
  .catch((err) => {
    console.log('failed', err);
  });
```

## Tests

```bash
$ npm run test
```

## License

MIT
