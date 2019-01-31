---
title: FormBinder
category: Components
chinese: ICE 表单粘合剂
---

ICE 表单数据获取方案。

**说明：**
1. 如果使用的是 FormBinder 0.x 的版本，请移步到 [0.x 参考文档](https://github.com/alibaba/ice/wiki/IceFormBinder-0.x)。
2. 如果使用的是 FormBinder 1.x 的版本，需要确保依赖的 react 版本在 [16.2.0](https://github.com/facebook/react/releases/tag/v16.2.0) 以上，1.x 版本使用了 React.Fragments API，支持 FormBinderWrapper 组件返回多个节点。

## 安装和升级

```bash
npm install @icedesign/form-binder
```

## 表单功能

- 表单双向绑定
- 表单值统一处理
- 布局自由组合
- 对数据的有效性进行验证

## 表单元素

表单元素指的是 ICE 基础组件以及业务组件中的 `Input` 、 `Checkbox` 、 `Select` 、 `Range` 、 `DatePicker` 、 `TimePicker` 、 `NumberPicker` 、 `Switch` 、 `Upload` 等以及用户自定义的组件，它能够响应 `onChange` 等用来获取用户输入

### 参数（Props）

| 方法名         | 说明                                                                     | 类型                                                     | 默认值 |
| :------------- | :----------------------------------------------------------------------- | :------------------------------------------------------- | :----- |
| validateFields | 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件 | ([fieldNames: string[]],callback(errors,values)) => void |        |

### FormBinderWrapper

整个表单的容器，支持传入 value 和 onChange 等属性，其中 value 会作为整个表单数据根节点，交由下层组件去获取、更新操作

经过 FormBinderWrapper 包装的组件，数据传递和同步将被接管，这意味着：

1. 你不需要使用表单元素的 `onChange` 来做同步，但还是可以继续监听 `onChange` 等事件
2. 你不能使用组件的表单元素的 `value`、 `defaultValue` 等属性来设置表单元素的值，但可以通过初始的 value 进行设置
3. 你不需要通过 setState 来动态更新表单的值，因为表单默认支持双向数据通信，但可以通过 setFieldValue 和 getFieldValue 来设置或者更新表单域的值

### 参数（Props）

| 属性参数                  | 说明                                                                  | 类型            | 默认值   |
| :------------------------ | :-------------------------------------------------------------------- | :-------------- | :------- |
| value                     | 表单值                                                                | object          | {}       |
| onChange                  | 任一表单域的值发生改变时的回调                                        | function(value) | () => {} |
| enableScrollErrorField    | 全局校验时，是否开启滚动到报错表单位置                                | boolean         | false    |
| scrollErrorFieldTopOffset | 全局校验滚动到报错位置时，距离顶部的偏移值（适用于头部 fixed 的场景） | number          | 0        |

### FormBinder

表单组件粘合剂，将其作为 FormBinderWrapper 的子组件，即可实现双向绑定特性，之后表单域的改变会通过 FormBinder 转发从而响应到 FormBinderWrapper 的 onChange 方法进行通信

FormBinder 支持的属性包含以下两部分：

- 自定义规则
- 检验规则

**自定义规则**

### 参数（Props）

| 属性参数      | 说明                   | 类型                        | 默认值     |
| :------------ | :--------------------- | :-------------------------- | :--------- |
| rules         | 校验规则，参考下方文档 | object[]                    |            |
| name​         | 表单域名称             | string                      |            |
| setFieldValue | 设置一个输入控件的值   | Function(fieldName: string) |            |
| getFieldValue | 获取一个输入控件的值   | Function(fieldName: string) |            |
| triggerType   | 指定合适的触发事件     | string                      | 'onChange' |

**校验规则**

### 参数（Props）

| 参数       | 说明                         | 类型                                    | 默认值   |
| :--------- | :--------------------------- | :-------------------------------------- | :------- |
| enum       | 枚举类型                     | string                                  |          |
| len        | 字段长度                     | number                                  |          |
| max        | 最大长度                     | number                                  |          |
| message    | 校验文案                     | string                                  |          |
| min        | 最小长度                     | number                                  |          |
| pattern    | 正则表达式校验               | RegExp                                  |          |
| required   | 是否必选                     | boolean                                 | `false`  |
| transform  | 校验前转换字段值             | function(value) => transformedValue:any |          |
| type       | 内建校验类型                 | string                                  | 'string' |
| validator  | 自定义校验                   | function(rule, value, callback)         |          |
| whitespace | 必选时，空格是否会被视为错误 | boolean                                 | `false`  |

> 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type)
> 自定义校验（注意，[callback 必须被调用](https://github.com/yiminghe/async-validator#validate)）

**推荐：**

1. 建议统一使用 async-validator 的校验规则，尽量不要使用表单元素的相关检验属性，这样做有利于代码的可维护性和优雅。
2. 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type)。
3. 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

### FormError

自定义表单的报错信息，自定义报错信息时需要指定 name，以此来获取当前报错的表单域来源

### 参数（Props）

| 参数      | 说明                           | 类型                       | 默认值 |
| :-------- | :----------------------------- | :------------------------- | :----- |
| name​     | 表单域名称                     | string                     |        |
| style     | 自定义样式对象                 | object                     |        |
| className | 自定义样式类名                 | string                     |        |
| render    | 自定义渲染报错的组件和处理逻辑 | Function(errors):ReactNode |        |

## 双向绑定协议

双向绑定协议指的是组件接收 `value` 和 `onChange` 两个参数，其用户输入值由 value 提供，当用户操作组件导致数据变更，组件会调用 `onChange` 并把新的 `value` 作为第一个参数传出。React 社区的大多数组件都遵守这个设计，如 `@alifd/next` 的 `Input`, `Select`, `Checkbox` 等，如果你希望你的表单类组件能够接入 FormBinder ，请务必遵守这个协议。
