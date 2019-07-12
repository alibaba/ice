---
title: 编写单元测试
order: 6
---

ice-scripts 支持 `ice-scripts test` 命令，内置 Jest 配置提供前端的单元测试解决方案。

> 测试功能在 `ice-scripts@2.1.3` 及更高版本中支持

## 测试文件名约定

默认的 `testMatch` 为 `**/?*.(spec|test).(j|t)s?(x)`，即 ice-scripts 将查找项目目录下所有符合条件的文件来执行测试

* 文件后缀为 `.spec.js`、`.spec.jsx`、`.spec.ts`、`.spec.tsx`
* 文件后缀为 `.test.js`、`.test.jsx`、`.test.ts`、`.test.tsx`

## 使用 jest.config.js

`ice-scripts` 已经内置了 Jest 测试所需的配置，提供了开箱即用的测试能力，如果需要定制自己的 Jest 配置，可以在项目目录下添加 `jest.config.js` 文件。

```js
// jest.config.js
module.exports = {
  testMatch: ['**/?*.e2e.js'],
};
```

jest.config.js 中自定义配置最终将和默认配置进行合并，更多 Jest 相关配置，请参见[官网](https://jestjs.io/docs/en/configuration)。

## 使用 Jest 相关参数

`ice-scripts` 通过约定的方式支持所有 Jest CLI 参数，相关参数增加 jest 前缀即可。

```bash
# Jest CLI 参数 --config=<path>
$ ice-scripts test --jest-config=<path>

# Jest CLI 参数 --watchAll
$ ice-scripts test --jest-watchAll
```

## 编写测试用例

使用 Jest 提供的内置函数可以快速创建相应的测试用例

```js
function sum(a, b) {
  return a + b;
}

it('sum numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

在日常 React 项目开发中，上述简单的例子不足以满足测试需求，测试实践中的需求往往可以可以分为两类，根据相应的需求可以选择社区的工具来帮助完成测试。

* 通过快照进行 UI 测试 - 可以通过 Jest SnapShot 能力进行测试
* DOM 交互测试 - 推荐使用 Enzyme，它提供了强大的 API 能力支持 UI 交互测试

### 使用 Snapshot 进行 UI 测试

Snapshot 测试是 Jest 提供的能力，可以自动生成组件 UI 输出的描述文件，确保你的 UI 不会发生意外的改变。

组件实现代码：

```js
// ./src/test.js
import React from 'react';

export default function Test() {
  return (
    <div className="test-component">
      test
    </div>
  );
}
```

组件测试代码：

```js
// ./test/snapshot.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Test from '../src/test';

it('renders', () => {
  const tree = renderer
    .create(<Test />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

在第一次运行后，Jest Snapshot 将会生成对应的 `.snap` 文件，如果组件的输出内容发生变更，则会导致测试用例无法通过。

### 使用 Enzyme 测试组件

Enzyme 是 Airbnb 提供的测试类库，它提供了一套简洁强大的 API。能够灵活操作 DOM，是 React 社区推荐的测试方案。

#### 准备工作

安装测试相关依赖包

```bash
$ npm install --save-dev enzyme enzyme-adapter-react-16 react-test-renderer
```

基于 React 开发的测试，需要安装对应的 React Adapter 来保证 enzyme 渲染的版本和项目中使用的版本一致，以 react 16 版本为例，需要进行如下设置：

```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

如果不想每个测试用例都去定义一遍，可以将上述内容保存至 `src/setupTests.js` 文件中，并自定义 Jest 配置中的 `setupFilesAfterEnv` ：

```js
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
```

#### 组件测试用例

Enzyme 提供 shallow 方法对组件进行浅渲染，即它仅仅会渲染至虚拟 DOM，不会返回真实的 DOM 节点。多数情况下 shallow 方法就能满足测试需求。

组件实现代码：

```js
import React, { useState } from 'react';

export default function Test() {
  const [content, setContent] = useState('default content');
  function onContentChanged() {
    setContent('test');
  }
  return (
    <div className="test-component">
      <span>{content}</span>
      <button onClick={onContentChanged}>button</button>
    </div>
  );
}
```

使用 shallow 方法测试组件：

```js
import React from 'react';
import Test from '../src/test';
import { shallow } from 'enzyme';

it('renders', () => {
  const wrapper = shallow(<Test />);
  const button = wrapper.find('button').at(0);
  // 模拟触发 点击 事件，来改变当前的 state
  button.simulate('click');
  expect(wrapper.find('span').at(0).text()).toBe('test');
});
```

更多测试用例编写，可以参考 [Enzyme 官网](https://airbnb.io/enzyme/)