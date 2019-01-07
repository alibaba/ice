---
title: 格式化接口返回
order: 3
importStyle: true
---

格式化接口返回的 Demo 适配老接口。

由于 DataBinder 方案对于接口有一定的规范，因此在接入老接口或者其他人的接口时，可能会有一些数据不兼容的问题，此时可以使用 `resposeFormatter` 配置来做数据格式兼容。

打开 Network 面板可以看到当前 Mock 接口的数据格式不符合 DataBinder 的数据要求。

````jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DataBinder from '@icedesign/data-binder';
import { Button } from '@alifd/next';

@DataBinder({
  fooData: {
    url: 'https://ice.alicdn.com/assets/mock/53146.json',
    // ajax 参数参见：https://github.com/axios/axios
    responseFormatter: (responseHandler, res, originResponse) => {
      // 拿到接口返回的 res 数据，做一些格式转换处理，使其符合 DataBinder 的要求
      // 最后再按照顺序丢到 responseHandler 方法里继续执行
      res = {
        success: res.code === "0" ? false : true,
        message: res.msg,
        params: {
          ...res.content
        }
      };
      responseHandler(res, originResponse);
    },
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
