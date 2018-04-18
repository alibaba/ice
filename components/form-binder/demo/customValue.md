---
title: 自定义 value 转换
order: 4
importStyle: true
---

演示对表单提交的数据进行自定义处理的功能。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, DatePicker, Grid } from '@icedesign/base';
const { Row, Col } = Grid;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: {
        date1: '',
        date2: '',
      }
    };
  }

  formChange = value => {
    console.log('value', value);
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
              <span>请选择日期（ value 不带转换）：</span>
              <IceFormBinder
                name="date1"
              >
                <DatePicker name="date1" />
              </IceFormBinder>
              <div><IceFormError name="date1" /></div>
            </div>
            <div>
              <span>请选择日期（ value 转换为第二个参数）：</span>
              <IceFormBinder
                name="date2"
                valueFormatter={(date, dateStr) => {
                  return dateStr;
                }}
              >
                <DatePicker name="date2" />
              </IceFormBinder>
              <div><IceFormError name="date2" /></div>
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
