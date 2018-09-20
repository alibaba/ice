---
title: 自定义错误
order: 4
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
import { Select, Button, Grid, Input } from '@icedesign/base';

const { Row, Col } = Grid;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { input: undefined },
    };
  }

  // 业务应用名校验
  inputValidator = (rule, value, callback) => {
    const errors = [];
    if (value === undefined || value === '') {
      errors.push('不能为空');
    }
    if (value === '1') {
      errors.push('不能为 1');
      errors.push('不能为 2');
    }
    callback(errors);
  };

  render() {
    return (
      <div>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            <div>
              <FormBinder
                required
                triggerType="onBlur"
                validator={this.inputValidator}
              >
                <Input
                  className="input"
                  name="input"
                  placeholder="callback不会清除"
                  htmlType="text"
                  hasLimitHint
                />
              </FormBinder>
              <FormError name="input" />
            </div>
          </div>
        </FormBinderWrapper>
      </div>
    );
  }
}
ReactDOM.render(<App />, mountNode);
````
