---
title: 表单方案
order: 9
---

## 背景

对于前端，表单开发是一件特别繁琐的事情，尤其在中后台业务中，大家常常会被各种五花八门的表单折磨，又不得不面对现实地去寻找最佳方案，但最终都会发现过度设计的表单组件性能不好，使用简单的表单组件还是需要写大量的业务代码。经过长期的积累以及在社区的调研，我们开发了一个表单组件帮助大家快速地创建一个高性能表单。

## 特性

- 内部几乎无依赖，体积小
- 内部管理表单状态，提升开发效率
- 使用观察者模式提升表单性能
- 强大的校验以及声明式联动
- 可结合第三方组件库(Next、Antd)
- 可自定义 Field

## 架构方案

> 可画张架构图更清晰的说明

## 为什么不？

**[NoForm](https://github.com/alibaba/nopage)**

NoForm 是一个表单操作(比如说校验、提交、联动等)抽象到上层，下层又包装了 Next、Antd 等组件，UI 上的能力较强，也封装了一些常用的布局，但功能能力较弱，用户实现复杂逻辑还是需要写很多代码。

**[Formik](https://github.com/jaredpalmer/formik)**、**[react-final-form](https://github.com/final-form/react-final-form)**

这两个组件有一些共性，都是通过 render props 的方式实现了复杂的状态管理，在性能上也非常地卓越，在社区得到了大量的好评，但在联动上的能力较弱(目前只能更新 value)，而且如果要集成 Next 或者 Antd 需要将库的表单组件都封装成 Field，成本较高。

## 安装

```bash
$ npm i @icedesign/form --save
```

## 快速上手

下面例子演示了如何创建一个简单的 form：

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from '@icedesign/form';

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
          <Field label="姓名：" name="username" component="input" type="text" />
          <Field label="年龄：" name="age" component='input' type="number" />
          <Field label="爱好：" name="hobby" component='select'>
            <option value="">--Please choose an option--</option>
            <option value="basketball">篮球</option>
            <option value="football">足球</option>
            <option value="badminton">羽毛球</option>
          </Field>
          <button type="submit">Submit</button>
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

TODO

## 相关链接

- [formik](https://github.com/jaredpalmer/formik)
- [react-final-form](https://github.com/final-form/react-final-form)
- [noform](https://alibaba.github.io/nopage/#/nopage/noform/brief-intro)
