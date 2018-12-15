---
title: React 基础知识和介绍
order: 5
category: 入门指引
---

> React 是 21 世纪人类智慧的结晶。

目前几乎绝大部分的组件化方案都是基于 React 实现，因为 React 就是专门为组件化而生的。因此，ICE 后台解决方案也采用了 React 这套方案进行构建。

## 了解 React

本文档不只谈 React 的功能、特性、优势，而是按照实际业务需求对创建一个 React 组件流程做一个介绍，并附带介绍相关特性给出详细参考文档链接。

### 创建一个 React 组件

首先拿到一系列的页面，我们第一步并不是去马上开发，而是先观察可复用部分抽出成独立的小组件，然后就可以通过拼接组件组装页面了。

制作一个组件通常需要展示一段 HTML 代码，创建一个最简单的 React 方法如下：

```jsx
class HelloMessage extends React.Component {

  render() {

    return (
      <div>Hello world!</div>
    );
  }
}
```
只需要声明一个继承 React Component 的 class 即可创建一个组件，每个组件必须要有一个 render 方法，render 方法的返回值是一段 JSX 代码。

JSX 语法跟 HTML 很像，但是还是有一些不同，比较简单的场景下，你可以看做是一样的。[JSX 具体语法请参见这篇文档](https://facebook.github.io/react/docs/jsx-in-depth-zh-CN.html)。

创建了一个 class 我们还需要去实例化、执行才可以渲染到页面上，所以我们可以调用下面这句代码将这个组件实际的渲染出来：

```
ReactDOM.render(<HelloMessage />, document.body);
```

### 为 React 组件传入数据

组件往往是需要展示一些动态数据的，而不是静态的，因此内容不能写死需要获取并传递下去。为此 React 创建了 props 这个概念用来往组件传入数据。

```jsx
class HelloMessage extends React.Component {
  render() {
    return (
      <div>Hello {this.props.name}</div>
    );
  }
}

ReactDOM.render(<HelloMessage name="浩睿" />, mountNode);
```
渲染组件的时候，按照 HTML 的方式传递一个属性 name 和值 '浩睿'，即可在组件内部的任何位置使用 `this.props.name` 拿到这个值进行处理。

props 是只读的，用来获取上层组件传递下来的数据。详情请参见：http://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react

### React 组件的变化是基于状态的

如果设计一个灯开关组件，那么对于这个开关组件它有两种状态，一种是开关开启状态（此时需要连通电线），一种是开关关闭状态（此时需要断开电线），而摁下开关是则是一种触发行为。为此 React 创建了 state 这个概念用来描述组件内部的状态，并支持获取事件进行触发。

```jsx
class Switch extends React.Component {
  state = {
    // 开关状态默认关闭
    switchStatus: false
  }

  switch = () => {
    // 切换开关的值
    this.setState({
      switchStatus: !this.state.switchStatus
    });
  };

  render() {

    if (this.state.switchStatus) {
      return (
        <div>
          <h1>灯已经打开，电线接通</h1>
          <button onClick={this.switch}>关灯</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>灯已经关闭，电线断开</h1>
          <button onClick={this.switch}>开灯</button>
        </div>
      );
    }
  }
}
```

组件内用到的数据都算作一种状态，存储在 state 里面，当可以拦截某些行为来去改变 state 的值（比如 点击 按钮），需要注意的是改变当前组件的 state 不能直接用 `this.state.switchStatus = true` 来改，必须使用 `this.setState` 方法进行修改。原因是因为状态改变了之后，React 需要重新执行 render 方法进行渲染，此时 render 方法读取 `this.state.switchStatus` 的值就是最新的数据，渲染结果也是最新的。所以必须有一种机制通知 React state 已经变换了，直接改变 `this.state.switchStatus = true` 的值，React 无法检测到状态有変更，因此必须使用 `this.setState({xxx})` 来修改 state 值。

React 组件在渲染的时候需要遵循一定的执行顺序，比如 state 改变之后必须重新执行 render 方法等。为了方便控制 React 的执行顺序和流程，React 创建了生命周期的概念用来处理此类功能。

关于 props 和 state 的详解，请参见：http://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react

### React 组件的生命周期

就像一个人一样，出生、赋予属性（props）、成长（state 変更）、衰老死亡（组件销毁），React 组件同样存在这些状态，便于做相关功能处理。

```jsx
class Person extends React.Component {

  // 即将出生（刚开始调用）
  componentWillMount() {
    console.log('我要出生了，我的名字叫 ', this.props.name);
  }

  // 出生（开始渲染，准备初始数据，调用 render 方法）
  constructor(props) {
    super(props);

    console.log('name', this.props.name);

    this.state = {
      name: this.props.name,
      age: 0
    };

    // 时间开始转动，5 秒等于 1 岁
    this.timer = setInterval(() => {
      this.setState({
        age: this.state.age + 1
      });
    }, 5000);

    console.log('我正在出生');
  }


  // 出生完毕（调用 render 完成并渲染到页面上）
  componentDidMount() {
    console.log('我已经出生');
  }

  // 接收了新的属性
  componentWillReceiveProps(nextProps) {
    // 换了个新名字，固定的属性
    if (nextProps.name !== this.state.name) {
      console.log('我换了个名字：', nextProps.name);
      this.setState({
        name: nextProps.name
      });
    }
  }

  // 要重新渲染了（准备过生日）
  componentWillUpdate() {
    console.log('我要改变了！');
  }
  // 更新渲染完成了（过完生日）
  componentDidUpdate() {
    console.log('我改变完了！');
  }

  // 要火化了（组件销毁）
  componentWillUnmount() {
    // 停止时间
    console.log('再见啦！');
    clearInterval(this.timer);
  }

  render() {
    console.log('我正在改变！');
    return (
      <div>
        <h1>姓名：{this.state.name}，年龄：{this.state.age}</h1>
      </div>
    );
  }
}
```

每一次 props 或者 state 改变，都会重新渲染组件，为了阻止渲染，React 还提供了 `shouldComponentUpdate` 方法，在 render 前判断是否有必要执行 render 提升性能。关于 React 声明周期，详情请参见官方文档：https://facebook.github.io/react/docs/react-component.html 。

附生命周期图：

![lifecycle](https://img.alicdn.com/tps/TB1Ng7_MpXXXXamXFXXXXXXXXXX-2850-2945.jpg)

## 总结

至此，几大 React 特性你大概了解了，再来回顾一下：

* props 用来传递数据，state 用来存储组件内部的状态和数据。props 是只读的，state 当前组件 state 的值可以作为 props 传递给下层组件。
* React 组件按照生命周期运行，改变 state 就会重新执行 render 方法。render 方法返回的是一段 JSX 语法的结构用来渲染到页面上。
