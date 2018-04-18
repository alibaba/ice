---
title: FormBinder
category: Components
chinese: ICE 表单粘合剂
---

ICE 表单数据获取方案。

## 一张图了解技术实现

![](https://img.alicdn.com/tfs/TB14a7ghhTI8KJjSspiXXbM4FXa-1742-1276.jpg)

## FormBinderWrapper 组件

整个表单的 wrapper，支持传入 value 和 onChange 方法，其中 value 会作为整个表单数据根节点，交由下面组件去获取、更新操作。

```jsx
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
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
    <IceFormBinderWrapper value={value} onChange={this.formChange}>
      ...
    </IceFormBinderWrapper>
  )
}
```

## FormBinder 组件

表单组件粘合剂，将其包裹在支持 value 和 onChange 的表单组件上面，即可实现双向绑定特性将表单的数据获取和变动和 FormBinderWrapper 进行沟通。

**注意：必须指定 name（以 value 为根节点的路径 JS 表达）以及其他表单相关属性。**

```jsx
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

...

return (
  <IceFormBinderWrapper value={value} onChange={this.formChange}>
    <div>
      <IceFormBinder><Input name="a.b" /></IceFormBinder>
    </div>
  </IceFormBinderWrapper>
)
```

之后 Input 输入框的变动，会通过 IceFormBinder 转发从而触发 IceFormBinderWrapper formChange 方法，用来更新 value 中 a.b 的值 `abc`。此外，默认情况下也会自动获取 `value.a.b` 的数据，填入 Input 组件中。

## FormError 组件

表单校验部分报错显示组件，自定义位置，需要指定 name（以 value 为根节点的路径）来指定当前报错组件的报错来源表单组件。

我们可以给 Input 添加一些校验属性（表单校验规则请参见下面文档），此时表单报错之后就需要在合适的位置显示报错项，可以将 FormError 组件加入合适位置。

```jsx
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

...

return (
  <IceFormBinderWrapper value={value} onChange={this.formChange}>
    <div>
      <IceFormBinder required={true} message="当前表单必填" ><Input name="a.b" /></IceFormBinder>
    </div>
    <IceFormError name="a.b" />
  </IceFormBinderWrapper>
)
```

## 表单校验

目前支持两种校验模式：一种是简洁快速校验方式，适用于简单的校验场景；另一种是复杂的自定义规则校验，这种通过编写自定义的业务逻辑适用于独特的校验需求。

> 校验底层库基于 async-validator 更加具体的校验规则参见 https://github.com/yiminghe/async-validator

### 简单校验

将校验规则直接放在 `<FormBinder>` 上面进行校验，所有校验项会合并成一条校验规则，目前支持以下校验项：

| props 名 | 校验功能 |
|---|---|
| message | 校验报错之后的提示文案 |
| required | 是否必填 |
| type | 当前值类型，例如：string、number、array 等，也包含一些 url、email 等常用格式，[点击查看详情](https://github.com/yiminghe/async-validator#type) |
| pattern | 正则校验填写正则表达式 |
| min | 最小值，对于字符串类型是对长度做运算，数组则是 item |
| max | 最大值，对于字符串类型是对长度做运算，数组则是 item |
| len | 固定长度，对于字符串类型是对长度做运算，数组则是 item |
| enum | 枚举值，配置枚举数组，数据必须属于某个枚举值 |
| whitespace | 支持输入空格，默认只输入空格会被 trim 掉从而认为没有值 |
| transform | 转换函数，输出的值校验前会流经这个函数支持进行转换 |
| validator | 自定义校验规则，当上面基础的 pattern、min、max 等无法校验（比如异步请求用户名是否被占用），需要使用 validator 方法编写校验逻辑，[点击查看详情](https://github.com/yiminghe/async-validator#validator) |

**以下是一些重要的提示，请务必仔细查看避免踩坑：**

* 如果不指定 message 则会显示默认的英文报错提示。
* type 为值的类型校验，具体 value 由被包裹组件输出，例如 <Input /> 组件输出的 value 格式始终为 string，所以配置 type 为 number 时会校验不通过。此时需要 transform 将 value 进行 parseInt 之类的转换操作或者使用 `pattern: /\d+/` 校验。
* 部分组件本身可能自带 type props，此时请务必保证 FormBinder 上面带有 type 配置，因为 FormBinder 会尝试读取下层表单组件的 props 来作为兜底校验规则，所以 props 与校验规则冲突可能会带来意外效果。

### 复杂校验

如果你需要支持两条及两条以上的校验规则，可以使用 `rules` props 进行校验，此时 `rules` 的规则完全等同于 async-validator 的 descriptor，此外 FormBinder 一旦发现有 `rules` 则不再会对基础规则的 props 进行扫描。

详细写法请参见下面 Demo。

### 整个表单主动触发校验

如果想在提交表单前对表单进行主动校验，则需要在 FormBinderWrapper 组件上面添加 ref，在合适的地方调用实现，全部校验发现报错表单会自动跳转到对应表单。

```jsx
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

...

validateForm = () => {
  this.refs.form.validateAll((errors, values) => {
    console.log('errors', errors, 'values', values);
  });
};

return (
  <div>
    <IceFormBinderWrapper

      ref="form"

      value={value}
      onChange={this.formChange}
    >
      ...
    </IceFormBinderWrapper>
    <Button onClick={this.validateForm}>校验</Button>
  </div>
)
```

## 常见需求和问题

### 部分表单组件输出的 value 不符合要求，希望进行转换后提交，如何处理？

以 [DatePicker](https://alibaba.github.io/ice/#/component/datepicker) 组件为例，它的 onChange 方法会返回两个参数 `Function(date: String, formatDate: String) => void` 其中第二个参数是格式化后字符串的数据，是真实需要的，此时可以对 `<FormBinder>` 传递 props:

```
<IceFormBinder
  name="date"
  valueFormatter={(date, dateStr) => {
    return dateStr;
  }}
>
  <DatePicker name="date" />
</IceFormBinder>
```

格式化之后进行 return 即可，详情参见下面 Demo。

### Combobox 组件不能用？非标准的组件如何接入 FormBinder 使用？

FormBinder 规定表单组件需要具备两个 props：

* value 用于接收数据进行回填
* onChange 用于用户操作之后，更新 value

如果表单组件不支持当前表单规范，需要自定封装一个自定义组件接入。详情参见下面 Demo。
