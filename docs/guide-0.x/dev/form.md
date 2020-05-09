---
title: 表单方案
order: 8
hide: true
---

对于前端，表单开发是一件特别繁琐的事情，尤其在中后台业务中，大家常常会被各种五花八门的表单折磨，又不得不面对现实去寻找最佳方案，但最终都会发现过度设计的表单组件性能不好，使用简单的表单组件还是需要写大量的业务代码。经过长期的积累以及在社区的调研，我们开发了一个表单组件帮助大家快速地创建一个高性能表单。

本文演示表单组件的基础用法，详细文档及 demo 可参考 [组件完整文档](/component/iceform)。

## 特性

- 使用成本低：内部管理表单状态
- 性能较好：使用观察者模式，输入时只会重新渲染当前操作的组件
- 可适配不同 UI 组件：支持 Next/antd/原生/... 表单组件
- 功能完善：校验、联动、布局等

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

class App extends Component {
  onSubmit = (values) => {
    window.alert(JSON.stringify(values, 0, 2));
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
