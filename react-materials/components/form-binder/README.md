---
title: FormBinder
category: Components
chinese: ICE 表单粘合剂
---

ICE 表单数据获取方案。

## 安装和升级

```bash
npm install @icedesign/form-binder
```

## 实现方案

![](https://img.alicdn.com/tfs/TB14a7ghhTI8KJjSspiXXbM4FXa-1742-1276.jpg)

### FormBinderWrapper 组件

整个表单的上下文组件，支持传入 `value` 和 `onChange` 方法，其中 `value` 会作为整个表单数据根节点，交由下层组件去获取、更新操作。

```jsx
import FormBinderWrapper, {
  FormBinder,
  FormError
} from '@icedesign/form-binder';

...

const value = {
  a: {
    b: 'abc'
  }
};

...

formChange = (value) => {
  console.log(value);
};

render() {
  return (
    <FormBinderWrapper value={value} onChange={this.formChange}>
      ...
    </FormBinderWrapper>
  )
}
```

### FormBinder 组件

表单组件粘合组件，将其包裹在支持[双向绑定协议](#双向绑定协议)的表单组件上面，即可实现双向绑定特性将表单的数据获取和变动和 FormBinderWrapper 进行沟通。

需要指定 name（以 value 为根节点的路径 JS 表达）以及其他表单相关属性。

```jsx
import FormBinderWrapper, {
  FormBinder,
  FormError
} from '@icedesign/form-binder';

...

return (
  <FormBinderWrapper value={value} onChange={this.formChange}>
    <div>
      <FormBinder><Input name="a.b" /></FormBinder>
    </div>
  </FormBinderWrapper>
)
```

之后 `Input` 输入框的变动，会通过 `FormBinder` 转发从而触发 `FormBinderWrapper`  的 `formChange` 方法，用来更新 `value` 中 `a.b` 的值 `abc`。此外，默认情况下也会自动获取 `value.a.b` 的数据，填入 `Input` 组件中。

### FormError 组件

表单校验部分报错显示组件，自定义位置，需要指定 name（以 value 为根节点的路径）来指定当前报错组件的报错来源表单组件。

我们可以给 Input 添加一些校验属性（表单校验规则请参见下面文档），此时表单报错之后就需要在合适的位置显示报错项，可以将 FormError 组件加入合适位置。

```jsx
import FormBinderWrapper, {
  FormBinder,
  FormError,
} from '@icedesign/form-binder';

...

return (
  <FormBinderWrapper value={value} onChange={this.formChange}>
    <div>
      <FormBinder required={true} message="当前表单必填" ><Input name="a.b" /></IceFormBinder>
    </div>
    <FormError name="a.b" />
  </FormBinderWrapper>
)
```

## 表单元素

表单元素指的是 ICE 基础组件以及业务组件中的 `Input, Checkbox, Select, Range, DatePicker, TimePicker， NumberPicker, Switch, Upload` 等以及用户自定义的组件，它能够响应 `value, onChange` 等用来获取用户输入。

### 表单校验属性名称表（props）

如果想要主动校验全部表单，则需要在 FormBinderWrapper 组件上面添加 ref，在合适的地方调用实现，全部校验发现报错表单会自动跳转到对应表单。

| 属性      | 针对的数据类型     | 用途                                                         | 备注                                           |
| --------- | ------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| required  | 全部               | 内容不可以为空                                               |                                                |
| min       | 数字               | 值必须大于等于 min                                           | 如果值为非数字，尝试转为数字，转换成功则做校验 |
| max       | 数字               | 值必须小于等于 max                                           | 如果值为非数字，尝试转为数字，转换成功则做校验 |
| len       | 字符串、数组、数值 | 当前表单值固定长度                                           |                                                |
| enum      | 数组               | 当前表单值枚举值                                             |                                                |
| minLength | 字符串             | 字符串长度必须大于等于 minLength                             | 只校验字符串                                   |
| maxLength | 字符串             | 字符串长度必须小于等于 maxLength                             | 只校验字符串                                   |
| most      | 数组               | 数组长度小于等于 most                                        | 只针对数组                                     |
| least     | 数组               | 数组长度大于等于 least                                       | 只针对数组                                     |
| pattern   | 字符串、数字       | 格式正则                                                     |                                                |
| format    | 字符串、数字       | 对常用 pattern 的总结，可选值：`url、email、tel、number`     |                                                |
| valueKey | 字符串 | 声明组件的响应字段 |  |  |
| validator | any | 传入函数进行自定义验证，具体参数见 [async-validator#rules](https://github.com/yiminghe/async-validator#rules) |                                                |


更加具体的校验规则参见 https://github.com/yiminghe/async-validator 。

**DEMO**

```jsx
import FormBinderWrapper, {
  FormBinder,
  FormError,
} from '@icedesign/form-binder';

...

validateForm = () => {
  this.refs.form.validateAll((errors, values) => {
    console.log('errors', errors, 'values', values);
  });
};

return (
  <div>
    <FormBinderWrapper
      ref="form"
      value={value}
      onChange={this.formChange}
    >
      ...
    </FormBinderWrapper>
    <Button onClick={this.validateForm}>校验</Button>
  </div>
)
```

### 自定义验证触发时机
验证触发时机指的是在合适触发表单校验，默认为表单组件 `onChange` 时。

通过修改 `triggerType` 来指定合适的触发事件。对于高频触发校验的 `Input` 可以设置为 `onBlur` 减少校验调用次数。

### 修改默认 `onChange` 的值内容

在 `DatePicker` 的使用场景中往往需要增加 `format="YYYY-MM-DD"` 格式化参数，由于 `onChange` 的默认返回值是 `[data, formatData]` 当需要第二个值绑定上 FormBinder 可以使用 `valueFormatter` API 来修改


```js
<FormBinder>
  <DatePicker format="YYYY-MM-DD" valueFormatter={(date, formatDate) => {return formatDate}} />
</FormBinder>
```

### 转换组件接收值的类型

例如 FormBinderWrapper 上绑定了  `{selected: 0}` , 需要将 `0` 转换成 Boolean 类型 `false` 传给 `<Switch />` 组件，可以使用 `valueTransformer` API 转换


```js
<FormBinder>
  <Switch
    name="selected" 
    valueKey="checked" // Switch 接收的属性是 `checked`
    valueTransformer={(selected) => {return selected === 1}} // 转换为 boolean 传给 switch
    valueFormatter={(checked) => {return checked ? 1 : 0}} //  返回值转换为 number 给表单
  />
</FormBinder>
```

在线实例： <https://codesandbox.io/embed/w78wrkx81l>

## 双向绑定协议

双向绑定协议指的是组件接收 `value` 和  `onChange` 两个参数，其用户输入值由 value 提供，当用户操作组件导致数据变更，组件会调用 `onChange` 并把新的 `value` 作为第一个参数抛出。React 社区的大多数组件都遵守这个设计，如 `@icedesign/base` 的 `Input`, `Select`, `Checkbox` 等，如果你希望你的表单类组件能够接入 FormBinder ，请务必遵守这个协议。

