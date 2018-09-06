---
title: 手动清空错误
order: 5
importStyle: true
---

有时候组件的取值属性不是 value，可以通过 valueKey 来进行修改

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import { Button, Input } from '@icedesign/base';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { input: '' },
    };
  }

  inputValidator = (rule, value, callback) => {
    const errors = [];
    if (value === undefined || value === '') {
      errors.push('不能为空');
    }
    if (value === 'abc') {
      errors.push('不能为 abc');
    }
    callback(errors);
  };

  handleCleanError = () => {
    this.setState({data: { input: 1 }})
  }

  handleSetError = () => {
    this.setState({data: { input: 'abc' }})
  }

  render() {
    return (
      <div>
      <FormBinderWrapper value={this.state.data} onChange={console.log} ref='form'>
        <div>
          <FormBinder
            name='input'
            // message="输入错误"
            // pattern={/^\d+$/}
            validator={this.inputValidator}
          >
            <Input />
          </FormBinder>
          <FormError name='input' />
        </div>
      </FormBinderWrapper>
      <div style={{paddingTop: 10}}>
        <Button onClick={this.handleCleanError}>清空错误</Button>
        <Button onClick={this.handleSetError}>错误值</Button>
      </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, mountNode);
````
