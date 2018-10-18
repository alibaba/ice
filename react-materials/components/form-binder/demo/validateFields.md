---
title: 分步校验表单
order: 5
importStyle: true
---

在表单检验中，可以分步骤对表单进行校验，先校验一部分表单域通过后在检验另外一部分表单

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { Input, Button } from '@icedesign/base';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        email: '',
        name: '',
        password: '',
      }
    };
  }

  formChange = value => {
    this.setState({
      value
    });
  };

  validateFields = (fieldnames = []) => {
    const cb = (errors, values) => {
      console.log('validateFields:', errors, values)
    }

    const { validateFields } = this.refs.form;

    if (fieldnames.length) {
      validateFields(fieldnames, cb);
    } else {
      validateFields(cb);
    }
  }

  render() {

    return (
      <div>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div>
            <div style={styles.formItem}>
              <span style={styles.formLabel}>名称：</span>
              <FormBinder name="name" required message="请输入名称" >
                <Input placeholder="淘小宝" /> 
              </FormBinder>
              <FormError style={styles.formError} name="name" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formLabel}>邮箱：</span>
              <FormBinder name="email" required message="请输入邮箱">
                <Input placeholder="ice-admin@alibaba-inc.com" /> 
              </FormBinder>
              <FormError style={styles.formError} name="email" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formLabel}>设置密码：</span>
              <FormBinder name="password" required message="请输入名称" >
                <Input htmlType="password" placeholder="设置新密码"  /> 
              </FormBinder>
              <FormError style={styles.formError} name="password" />
            </div>

          </div>
        </FormBinderWrapper>
        
        <div style={{marginTop: 20}}>
          <Button type="secondary" onClick={this.validateFields}>
            校验整个表单
          </Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={() => this.validateFields(['name', 'email'])}>
            只校验名称和邮箱
          </Button>
        </div>

        <div style={styles.preview}>
          <strong>当前表单数据</strong>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </div>

      </div>
    );
  }
}

const styles = {
  formItem: {
    marginBottom: '20px'
  },
  formLabel: {
    width: '70px',
    marginRight: '10px',
    textAlign: 'right',
    display: 'inline-block'
  },
  formError: {
    marginLeft: '10px',
  },
  preview: {
    border: '1px solid #eee', 
    marginTop: 20,
    padding: 10
  }
}

ReactDOM.render(<App />, mountNode);
````
