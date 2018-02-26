---
title: 如何制作表单
order: 4
category: 进阶指南
---

在中后台前端应用中，表单是一个非常常见的需求，用于填写一些信息、校验、编辑、提交等。本文档专门介绍如何使用 ICE 快速实现常见的后台表单类需求。

为了简化使用，提高开发效率，我们推荐使用 ICE 表单粘合剂组件 `@icedesign/form-binder` 配合 ICE 提供的一系列表单类组件(如 Input, Select 等) 的组合来进行开发。

在这里我们准备了非常常见的业务场景作为演示，**模态框 + 表格 + 表单** 组合的业务场景。

![](https://img.alicdn.com/tps/TB1GZQhNFXXXXatXpXXXXXXXXXX-1420-506.png)

这里假设已经有一个 ice-form 组件创建的表单（实际使用需要 import 相关资源，具体请参见 Demo：http://ice.alibaba-inc.com/modules/ice-form#modules-ice-form-demo-all ）：

```jsx
// 增强表单组件 @ali/ice-form
<Form
  {...formItemLayout}
  // 声明 ref 以获得表单组件的引用
  ref="formInstance"
>
  <Input htmlType="hidden" name="id" />
  <Input label="姓名：" name="name" />
  <NumberPicker label="年龄：" name="age" />
  <RadioGroup label="性别：" name="sex">
    <Radio value="male">男</Radio>
    <Radio value="female">女</Radio>
  </RadioGroup>
  <CheckboxGroup label="爱好：" dataSource={hobbies} name="hobby" >
</Form>
```

在各个表单组件中声明对应的`name` 字段后，增强表单会自动与这些组件的数据进行关联，之后我们就要利用增强表单自带的功能进行获取、校验、回填处理。

## 回填数据

在使用增强表单组件后，我们不需要为单独的表单组件（如 Input，Radio 等）进行 value 值的回填。我们可以在 `Form` 上用 `value` 统一进行回填，使用对象的形式，其中键值会自动与表单上的 `name` 进行关联，就像 HTML5 标准表单一样：

```jsx
<Form
  {...formItemLayout}
  value={{
    id: '1'
    name: '卓凌',
    age: 20,
    sex: 'male'
  }}
  // 声明 ref 以获得表单组件的引用
  ref="formInstance"
>
  <Input htmlType="hidden" name="id" />
  <Input label="姓名：" name="name" />
  <NumberPicker label="年龄：" name="age" />
  <RadioGroup label="性别：" name="sex">
    <Radio value="male">男</Radio>
    <Radio value="female">女</Radio>
  </RadioGroup>
  <CheckboxGroup label="爱好：" dataSource={hobbies} name="hobby" >
</Form>
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
      <Form
        {...formItemLayout}
        value={this.state.formValue}
        // 声明 ref 以获得表单组件的引用
        ref="formInstance"
      >
        <Input htmlType="hidden" name="id" />
        <Input label="姓名：" name="name" />
        <NumberPicker label="年龄：" name="age" />
        <RadioGroup label="性别：" name="sex">
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </RadioGroup>
        <CheckboxGroup label="爱好：" dataSource={hobbies} name="hobby" >
        <Button onClick={this.clearForm}>清空表单值</Button>
      </Form>
    );
  }
}
```

> 提示：专门针对清空表单的操作，ice-form 提供了 Reset 组件方便操作，详情见 [ice-form 文档](http://ice.alibaba-inc.com/modules/ice-form)。

## 校验和获取数据

回填好了表单，用户也正常编辑了表单，那么在确定或者提交操作后，就需要校验并获取相关数据进行下一步处理。

与 Field 的使用方式不同，增强表单支持直接在表单控件上用 HTML5 标准相似的方式进行表单校验逻辑的声明：

参照 [增强表单文档](http://ice.alibaba-inc.com/modules/ice-form#表单校验属性名称表（props）)可以查询校验相关的 Props。必填的表单（required）会在 label 上自动显示 \* 号。

配置好校验项后，在获取数据的时候就会对每个值进行校验，如果有报错则会抛出来。具体用法如下：

```jsx
class Demo extends Component {
  getData = () => {
    // 校验并获取数据
    // ...
  };

  render() {
    return (
      <Form
        {...formItemLayout}
        // 回填数据
        value={this.state.formValue}
        // 声明 ref 以获得表单组件的引用
        ref="formInstance"
      >
        <Input htmlType="hidden" name="id" />
        <Input label="姓名：" name="name" required />
        <NumberPicker
          label="年龄："
          name="age"
          required
          format="number"
          min={18}
          max={100}
        />
        <RadioGroup
          label="性别："
          name="sex"
          required
          requiredMessage="必须选择性别！"
        >
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </RadioGroup>
        <CheckboxGroup
          label="爱好："
          dataSource={hobbies}
          name="hobby"
          required
        />
      </Form>
    );
  }
}
```

下一步是获取数据，如果你的表单需要将数据用 Ajax 发送到服务端，其实增强表单已经自带了数据发送功能！在 Form 上添加 action 和 method 属性，配合 `Submit` 组件就能快速提交！

```jsx
import Form, { Submit } from '@ali/ice-form';
class Demo extends Component {
  render() {
    return (
      <Form
        {...formItemLayout}
        action="/api/receive-form.do"
        method="POST"
        // 回填数据
        value={this.state.formValue}
        // 声明 ref 以获得表单组件的引用
        ref="formInstance"
      >
        <Input htmlType="hidden" name="id" />
        <Input label="姓名：" name="name" required />
        <NumberPicker
          label="年龄："
          name="age"
          required
          format="number"
          min={18}
          max={100}
        />
        <RadioGroup
          label="性别："
          name="sex"
          required
          requiredMessage="必须选择性别！"
        >
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </RadioGroup>
        <CheckboxGroup
          label="爱好："
          dataSource={hobbies}
          name="hobby"
          required
        />
        <Submit>提交</Submit>
      </Form>
    );
  }
}
```

如果你需要获取数据进行其他操作或不想要用 Form 自带的数据提交功能，你可以手动调用 validate 方法。

`validate` 是一个异步的操作，返回一个 Promise，因此依赖表单 value 的操作都需要放在它的 then/catch 函数里面。then 的参数是表单数据值，是一个对象。catch 的参数是校验错误，是一个包含了错误的数组。在一次校验过程中，then 和 catch 只有一个会被执行，其取决于校验成功或校验失败。

```jsx
import Form, { Submit } from '@ali/ice-form';
class Demo extends Component {
  getData = () => {
    // 使用 this.refs.formInstance 需要在 Form 上声明如下 ref
    this.refs.formInstance
      .validate()
      .then((value) => {
        alert('表单校验成功，获取到数据');
        console.log(value);
      })
      .catch((errors) => {
        alert('有表单校验错误，请检查！');
      });
  };

  render() {
    return (
      <Form
        {...formItemLayout}
        action="/api/receive-form.do"
        method="POST"
        // 回填数据
        value={this.state.formValue}
        // 声明 ref 以获得表单组件的引用
        ref="formInstance"
      >
        <Input htmlType="hidden" name="id" />
        <Input label="姓名：" name="name" required />
        <NumberPicker
          label="年龄："
          name="age"
          required
          format="number"
          min={18}
          max={100}
        />
        <RadioGroup
          label="性别："
          name="sex"
          required
          requiredMessage="必须选择性别！"
        >
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </RadioGroup>
        <CheckboxGroup
          label="爱好："
          dataSource={hobbies}
          name="hobby"
          required
        />
        <Button onClick={this.getData}>提交</Button>
      </Form>
    );
  }
}
```

### 校验规则的类型陷阱

在前端开发中，有一些类型陷阱是需要开发者特别注意的。用户输入的 `Input` 等，它的类型默认都是字符串 `String`，当然你可以回填一个 `Number` 类型的数据给 `Input`，但是在取值的时候它会被转换成字符串。

```jsx
import Form, { Submit } from '@ali/ice-form';
class Demo extends Component {
  getData = () => {
    // 使用 this.refs.formInstance 需要在 Form 上声明 ref
    this.refs.formInstance
      .validate()
      .then((value) => {
        alert(typeof value.id); // 接收到 String
      })
      .catch((errors) => {
        alert('有表单校验错误，请检查！');
      });
  };

  render() {
    return (
      <Form
        // 警告！回填数字类型给 Input
        value={{ id: 1 }}
        // 声明 ref 以获得表单组件的引用
        ref="formInstance"
      >
        <Input label="ID:" name="id" />
        <Button onClick={this.getData}>提交</Button>
      </Form>
    );
  }
}
```

> 如果需要数字类型需要进行转换，详情请参见 [JavaScript 语言介绍和基础知识](/docs/guide/intro-javascript) 文档。

### 如何校验纯数字的 value ？

```jsx
<Input name="memberId" format="number" />
```

### 如何自定义校验文本？

不同的规则根据可以设置不同的错误消息。

自定义格式：`${规则名称}Message`

```jsx
<Input name="memberId" format="number" formatMessage="必须是数字类型" />
```

### 如何自定义验证触发时机？

验证触发时机指的是在合适触发表单校验，默认为 `onChange`

自定义格式：`${规则名称}Trigger`

```jsx
<Input
  name="memberId"
  format="number"
  formatMessage="必须是数字类型"
  formatTrigger="onBlur"
/>
```

## 总结

至此，已经讲解完了如何使用增强表单组件并进行相关操作，以及可能遇到的问题。简单的回顾：

1. 首先使用 Form 创建表单项。
2. 在表单组件上使用 `name` 进行数据关联，配置校验规则。
3. 使用 `Form` 的 `value`属性进行数据回填。
4. 使用 `Submit` 组件提交数据或用 `valildate` 方法校验当前表单数据并获取进行后续操作。

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

直接使用表单组件的 `onChange` 或者 Form 的 `onChange` 即可，没有任何魔法。

```jsx
handleInputChange = (input) => {
  console.log('Input 的值现在是', input);
};
// ...
<Input onChange={this.handleInputChange} />;
```

```jsx
handleFormChange = (value, changedByName) => {
  const changedValue = value[changedByName];
  console.log('由于' + changedByName + '变成了' + changedValue);
  console.log('表单的值现在是', value);
};
// ...
<Form onChange={this.handleFormChange}>
  <Input name="foo" />
</Form>;
```
