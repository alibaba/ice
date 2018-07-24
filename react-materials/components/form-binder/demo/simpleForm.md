---
title: 简单表单
order: 1
importStyle: true
---

本 Demo 演示最基础的用法。包括表单数据获取和校验。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { DatePicker, Input, Button, Select } from '@icedesign/base';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        a: {
          b: {
            c: 'abc'
          }
        }
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

    if (this.state.value.a.b.c) {
      alert('请先删掉 Input 里面的值，之后可以看到必填校验报错。');
    }

    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  }

  render() {
    console.log('this.state.value', this.state.value);

    return (
      <div>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            <span>填写标题：</span>
            <IceFormBinder name="a.b.c" required max={10} message="当前标题必填" >
              <Input  /> 
            </IceFormBinder>
            <IceFormError style={{marginLeft: 10}} name="a.b.c" />
          </div>
        </IceFormBinderWrapper>
        
        <div style={{marginTop: 20}}>
          <Button onClick={() => {
            this.setState({
              value: {
                a: {
                  b: {
                    c: '哈哈哈'
                  }
                }
              }
            })
          }}>
            修改数据为 哈哈哈
          </Button>
          <Button style={{marginLeft: 10}} onClick={this.validateAllFormField}>
            校验整个表单
          </Button>
        </div>

        <div style={{border: '1px solid #ccc', background: '#cacaca', marginTop: 20, padding: 10}}>
          <strong>当前表单数据</strong>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
