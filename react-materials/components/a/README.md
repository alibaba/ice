---
title: IceFormBinder
category: Components
chinese: ICE 表单粘合剂
repo: ice-components/ice-form-binder
---

ICE 表单数据获取方案。

## 安装和升级

```bash
def add @ali/ice-form-binder
```

## 一张图了解技术实现方案

![](https://img.alicdn.com/tfs/TB14a7ghhTI8KJjSspiXXbM4FXa-1742-1276.jpg)

## FormBinderWrapper 组件

整个表单的 wrapper，支持传入 value 和 onChange 方法，其中 value 会作为整个表单数据根节点，交由下面组件去获取、更新操作。

```
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@ali/ice-form-binder';

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

需要指定 name（以 value 为根节点的路径 JS 表达）以及其他表单相关属性。

```
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@ali/ice-form-binder';

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

```
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@ali/ice-form-binder';

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

更加具体的校验规则参见 https://github.com/yiminghe/async-validator 。

如果想要主动校验全部表单，则需要在 FormBinderWrapper 组件上面添加 ref，在合适的地方调用实现，全部校验发现报错表单会自动跳转到对应表单。

```
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@ali/ice-form-binder';

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
