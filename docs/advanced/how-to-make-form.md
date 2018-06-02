---
title: 如何制作表单
order: 4
category: 进阶指南
---

在中后台前端应用中，表单是一个非常常见的需求，用于填写一些信息、校验、编辑、提交等。本文档专门介绍如何使用 ICE 快速实现常见的后台表单类需求。

为了简化使用，提高开发效率，我们推荐使用 ICE 表单粘合剂组件 `@icedesign/form-binder` 配合 ICE 提供的一系列表单类组件(如 Input, Select 等) 的组合来进行开发。

在这里我们准备了非常常见的业务场景作为演示，**模态框 + 表格 + 表单** 组合的业务场景。

![](https://img.alicdn.com/tps/TB1GZQhNFXXXXatXpXXXXXXXXXX-1420-506.png)

在各个表单组件包裹 `FormBinder` 组件，并声明对应的 `name` `FormBinder` 会自动与这些组件的数据进行关联，之后我们就要利用 `FormBinder` 自带的功能进行获取、校验、回填处理。

## 回填数据

在使用 `FormBinder` 组件后，我们不需要为单独的表单组件（如 Input，Radio 等）进行 value 值的回填。我们可以在 `FormBinderWrapper` 上用 `value` 统一进行回填，使用对象的形式，其中键值会自动与 `FormBinder` 上的 `name` 进行关联，就像 HTML5 标准表单一样：

```jsx
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';

<FormBinderWrapper
  value={{
    id: '1'
    name: '卓凌',
    age: 20,
    sex: 'male'
  }}
  // 声明 ref 以获得表单组件的引用
  ref="formInstance"
>
  <div>
    <FormBinder name="id">
      <Input htmlType="hidden" />
    </FormBinder>
    <FormBinder name="name">
      <Input label="姓名：" />
    </FormBinder>
    <FormBinder name="age">
      <NumberPicker label="年龄：" />
    </FormBinder>
    <FormBinder name="sex">
      <RadioGroup label="性别：">
        <Radio value="male">男</Radio>
        <Radio value="female">女</Radio>
      </RadioGroup>
    </FormBinder>
    <FormBinder name="hobby">
      <CheckboxGroup label="爱好：" dataSource={hobbies} />
    </FormBinder>
  </div>
</FormBinderWrapper>
```

由于 Form 此时是一个受控组件，清空数据等操作可以对 `value` 赋空值进行：

```jsx
class Demo extends Component {
  state = {
    formValue: {
      id: '1'
      name: '卓凌',
      age: 20,
      sex: 'male'
    }
  };

  clearForm = () => {
    this.setState({
      formValue: {}
    });
  };

  render() {
    return (
      <FormBinderWrapper
        value={this.state.formValue}
        // 声明 ref 以获得表单组件的引用
        ref="formInstance"
      >
        <div>
          <FormBinder name="id">
            <Input htmlType="hidden" />
          </FormBinder>
          <FormBinder name="name">
            <Input label="姓名：" />
          </FormBinder>
          <FormBinder name="age">
            <NumberPicker label="年龄：" />
          </FormBinder>
          <FormBinder name="sex">
            <RadioGroup label="性别：">
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </RadioGroup>
          </FormBinder>
          <FormBinder name="hobby">
            <CheckboxGroup label="爱好：" dataSource={hobbies} />
          </FormBinder>
          <Button onClick={this.clearForm}>清空表单值</Button>
        </div>
      </FormBinderWrapper>
    );
  }
}
```

## 主动触发校验

如果想要主动校验全部表单，则需要在 FormBinderWrapper 组件上面添加 ref，在合适的地方调用实现，全部校验发现报错表单会自动跳转到对应表单。

```jsx
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';

validateForm = () => {
  this.form.validateAll((errors, values) => {
    console.log('errors', errors, 'values', values);
  });
};

<FormBinderWrapper
  ref={(ref) => { this.form = ref; }}
  value={value}
  onChange={this.formChange}
>
  ...
</FormBinderWrapper>
<Button onClick={this.validateForm}>校验</Button>
```

### 校验规则的类型陷阱

在前端开发中，有一些类型陷阱是需要开发者特别注意的。用户输入的 `Input` 等，它的类型默认都是字符串 `String`，当然你可以回填一个 `Number` 类型的数据给 `Input`，但是在取值的时候它会被转换成字符串。

```jsx
<FormBinder name="id">
  <Input >
</FormBinder>
```

## 总结

至此，已经讲解完了如何使用 `FormBinder` 组件并进行相关操作，以及可能遇到的问题。简单的回顾：

1.  首先使用 `FormBinderWrapper` 包裹所有表单项。
2.  在 `FormBinder` 组件上使用 `name` 进行数据关联，配置校验规则。
3.  使用 `FormBinderWrapper` 的 `value` 属性进行数据回填。
4.  使用 ref 上的 `valildateAll` 方法校验当前表单数据并进行后续操作。

## FAQ

### Q：表单作为一个子组件的时候，我怎么把需要回填的值传递下去并回填？

React 组件有一个生命周期 componentWillReceiveProps 是在当前组件 props 变动的时候触发，此时可以在这个生命周期方法中传递 value：

```jsx
class Demo extends React.Component {

  ...

  state = {
    formValue: {}
  };

  componentWillReceiveProps(nextProps) {
    // nextProps 是上层传下来需要回填的数据
    if(nextProps.name) {
      const { formValue } = this.state;
      this.setState({
        formValue: {
          ...formValue,
          name
        }
      });
    }
  }

  render() {
    return (
      ...
    );

  }
}
```

### Q：如何在表单组件 onChange 的时候做一些额外的事情？

直接使用表单组件的 `onChange` 或者 FormBinderWrapper 的 `onChange` 即可，没有任何魔法。

```jsx
handleInputChange = (input) => {
  console.log('Input 的值现在是', input);
};
// ...
<Input onChange={this.handleInputChange} />;
```

```jsx
handleFormChange = (value) => {
  console.log('表单的值现在是', value);
};
// ...
<FormBinderWrapper onChange={this.handleFormChange}>
  <div>
    <FormBinder name="foo">
      <Input placeholder="bar" />
    </FormBinder>
  </div>
</FormBinderWrapper>;
```
