---
title: 表单方案
order: 9
---

对于前端，表单开发是一件特别繁琐的事情，尤其在中后台业务中，大家常常会被各种五花八门的表单折磨，又不得不面对现实去寻找最佳方案，但最终都会发现过度设计的表单组件性能不好，使用简单的表单组件还是需要写大量的业务代码。经过长期的积累以及在社区的调研，我们开发了一个表单组件帮助大家快速地创建一个高性能表单。

## 安装方法

```bash
$ npm install @ice/form --save
```

## 引用方法

```js
import { Form, Field, FieldArray } from '@ice/form';
```

## 快速上手

下面例子演示了如何创建一个简单的 form：

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from '@ice/form';
import { Button, Input } from '@alifd/next';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class App extends Component {
  async onSubmit(values) {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <div>Simple Form</div>
          <Field label="姓名：" name="username" component={Input} placeholder="请输入名字" />
          <Field label="年龄：" name="age" component={Input} htmlType="number" placeholder="请输入年龄" />
          <Field label="简介：" name="intro" component={Input.TextArea} />
          <Button htmlType="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
```

## 示例

- [demos](https://unpkg.com/@ice/form/build/index.html)

## 相关链接

- [GitHub 仓库](https://github.com/ice-lab/react-materials/tree/master/components/form)