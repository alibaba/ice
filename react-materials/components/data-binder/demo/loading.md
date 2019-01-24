---
title: 自定义加载效果
order: 4
importStyle: true
---

自定义加载效果的 Demo。

在 AJAX 加载过程中，给用户一个加载反馈是非常重要的，DataBinder 针对每个 DataSource 附加了一个私有属性 `__loading` 用来标记当前模块是否在请求中。因此你可以判断这个属性来看是否显示加载效果。

为了方便，我们还提供了一个全局的 `__loading` 属性在 `this.props.bindingData` 上面，当前 Class 注册的任意 DataSource 在请求中，全局都会随之改变。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DataBinder from '@icedesign/data-binder';
import {
  Button,
  Loading
} from '@alifd/next';

@DataBinder({
  foo1Data: {
    url: 'https://ice.alicdn.com/assets/mock/53138.json',
    // ajax 参数参见：https://github.com/axios/axios
    defaultBindingData: {
      foo: 'bar'
    }
  },
  foo2Data: {
    url: 'http://dip.alibaba-inc.com/api/v2/services/schema/mock/53138',
    // ajax 参数参见：https://github.com/axios/axios
    defaultBindingData: {
      foo: 'bar'
    }
  }
})
class App extends Component {

  refreshFoo1 = () => {
    this.props.updateBindingData('foo1Data', {
      params: {
        bar: 'foo'
      }
    });
  };
  refreshFoo2 = () => {
    this.props.updateBindingData('foo2Data', {
      params: {
        bar: 'foo'
      }
    });
  };

  render() {
    const {foo1Data, foo2Data} = this.props.bindingData;

    return (
      <div>
        <div>
          <Loading visible={foo1Data.__loading}>
            <div>
              foo1 的值： {foo1Data.foo}
            </div>
          </Loading>
          <div style={{marginTop: 10}}>
            <Button onClick={this.refreshFoo1}>请求获取 foo1 新数据</Button>
          </div>
        </div>
        <div style={{marginTop: 30}}>
          <Loading visible={foo2Data.__loading}>
            <div>
              foo2 的值： {foo2Data.foo}
            </div>
          </Loading>
          <div style={{marginTop: 10}}>
            <Button onClick={this.refreshFoo2}>请求获取 foo2 新数据</Button>
          </div>
        </div>
        <h3>当前页面是否有模块正在加载：{this.props.bindingData.__loading ? '是' : '否'}</h3>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
