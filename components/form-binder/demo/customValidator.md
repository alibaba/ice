---
title: 自定义校验
order: 3
importStyle: true
---

演示高级复杂的自定义校验功能实现方式。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Grid } from '@icedesign/base';
const { Row, Col } = Grid;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: {
        ip: '',
      }
    };
  }

  formChange = (value, changedByName) => {
    console.log('value', value, 'changedByName', changedByName);
    this.setState({
      value
    });
  };

  validateAllFormField = () => {
     this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {

    return (
      <div>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            <div>
              <span>请输入 IP（数字累加要超过 200）：</span>
              {/* rules 作为 descriptor 透传给 async-validator 详细书写方式请参见 https://github.com/yiminghe/async-validator  */}
              <IceFormBinder
                rules={[
                  {
                    type: 'string',
                    required: true,
                    parttern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
                    message: '请输入一个合规的 IP，必填',
                  },
                  {
                    validator(
                      rule,
                      value,
                      callback,
                      source,
                      options
                    ) {
                      var errors = [];
                      const numbers = value.split('.');
                      const sum = numbers.reduce((item, prev) => {
                        return parseInt(prev) + parseInt(item);
                      }, 0);
                      // 如果不符合规则，则输入 error
                      if (sum < 200) {
                        errors.push('数字部分累加要超过 200');
                      }
                      callback(errors);
                    },
                  },
                ]}
              >
                <Input name="ip" />
              </IceFormBinder>
              <div><IceFormError name="ip" /></div>
            </div>
          </div>
        </IceFormBinderWrapper>
        <div style={{border: '1px solid #ccc', background: '#cacaca', marginTop: 20, padding: 10}}>
          <strong>当前表单数据：</strong>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, mountNode);
````
