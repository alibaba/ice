---
title: 自定义请求 callback
order: 5
importStyle: true
---

自定义请求成功或者失败的处理逻辑。

DataBinder 默认的请求成功和失败的行为是弹一个 Toast 将接口的 message 字段信息展示一下。如果你需要自定义一些成功失败的行为可以在 DataSource 中配置 success 和 error 来接入。其中第二个参数是 DataBinder 默认的回调处理逻辑（弹 Toast）如果不需要可以不调用。

error 有两类错位，一类是网络中断，请求都没有到后端服务器；另一类是服务器接口报错（即接口返回 success 字段为 false）。两者应该给用户不同的提示和处理逻辑，可以通过其他参数来判断。

此外为了方便在 render 中处理，与 `__loading` 类似，我们针对每个 DataSource 附加了一个 `__error` 属性用来标记当前模块是否有报错，默认值为 null，出错时会变为 `{message: '报错信息'}` 数据。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DataBinder from '@icedesign/data-binder';
import { Button, Loading, Message } from '@alifd/next';

@DataBinder({
  foo1Data: {
    url: 'https://ice.alicdn.com/assets/mock/53138.json',
    // ajax 参数参见：https://github.com/axios/axios
    success: (res, defaultCallback, originResponse) => {
      console.log('res', res, originResponse);
      defaultCallback();
    },
    error: (res, defaultCallback, originResponse) => {
      console.log('res', res, originResponse);
      defaultCallback();
    },

    defaultBindingData: {
      foo: 'bar'
    }
  },
  foo2Data: {
    url: 'http://dip.alibab2a-inc.com/api/v2/services/schema/mock/53138',
    // ajax 参数参见：https://github.com/axios/axios
    error: (res, defaultCallback, originResponse) => {
      console.log('res', res, originResponse);
      console.log('详细网络问题可以通过 originResponse 参数拿到：', originResponse.status);
      defaultCallback();
    },
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
          <h3>foo1 演示自定义回调</h3>
          <Loading visible={foo1Data.__loading} shape="fusion-reactor">
            <div>
              foo1 的值： {foo1Data.foo}
            </div>
          </Loading>
          {foo1Data.__error
            ?
            <Message type="error">
              foo1 数据获取失败，失败 message： {foo1Data.__error.message}
            </Message>
            :
            <Message>
              foo1 数据获取成功
            </Message>
          }
          <div style={{marginTop: 10}}>
            <Button onClick={this.refreshFoo1}>请求获取 foo1 新数据</Button>
          </div>
        </div>
        <div style={{marginTop: 30}}>
          <h3>foo2 接口有问题，会模拟网络请求 error</h3>
          <Loading visible={foo2Data.__loading} shape="fusion-reactor">
            <div>
              foo3 的值： {foo2Data.foo}
            </div>
          </Loading>
          {foo2Data.__error &&
            <Message type="error">
              foo1 数据获取失败，失败 message： {foo2Data.__error.message}
            </Message>
          }
          <div style={{marginTop: 10}}>
            <Button onClick={this.refreshFoo2}>请求获取 foo2 新数据</Button>
          </div>
        </div>
        <h3>当前页面是否有模块请求报错：{this.props.bindingData.__error ? '是' : '否'}，报错信息：{this.props.bindingData.__error && this.props.bindingData.__error.message}</h3>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
