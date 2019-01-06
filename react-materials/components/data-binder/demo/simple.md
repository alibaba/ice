---
title: 简单的用法
order: 1
importStyle: true
---

本 Demo 演示最基础的用法。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DataBinder from '@icedesign/data-binder';
import {
  Button
} from '@alifd/next';

@DataBinder({
  fooData: {
    url: 'https://ice.alicdn.com/assets/mock/53138.json',
    // ajax 参数参见：https://github.com/axios/axios
    defaultBindingData: {
      foo: 'bar'
    }
  }
})
class App extends Component {

  refreshFoo = () => {
    this.props.updateBindingData('fooData', {
      // ajax 参数参见：https://github.com/axios/axios
      // 当前接口不需要参数，在这里只是演示，可以打开 Devtool 的 network 面板查看做了什么
      params: {
        bar: 'foo'
      }
    });
  };

  render() {
    const {fooData} = this.props.bindingData;

    return (
      <div>
        <div>
          foo 的值： {fooData.foo}
        </div>
        <div style={{marginTop: 10}}>
          <Button onClick={this.refreshFoo}>请求获取新数据</Button>
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
