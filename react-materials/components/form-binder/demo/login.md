---
title: 登录表单
order: 1
importStyle: true
---

普通的登录表单，可以自由组合布局，自定义排列标签和表单域

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { Input, Button, Checkbox, Message } from '@alifd/next';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false
      }
    };
  }

  formChange = value => {
    // 说明：
    //  1. 表单是双向通行的，所有表单的响应数据都会同步更新 value
    //  2. 这里 setState 只是为了实时展示当前表单数据的演示使用
    this.setState({ value });
  };

  validateFields = () => {
    const { validateFields } = this.refs.form;

    validateFields((errors, values) => {
      console.log({ errors })

      if (!errors) {
        Message.success('登录成功')
      }
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <FormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.content}>
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>名称：</span>
              <FormBinder name="username" required message="请输入正确的名称" >
                <Input />
              </FormBinder>
              <FormError style={styles.formItemError} name="username" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>密码：</span>
              <FormBinder name="password" required message="请输入正确的密码">
                <Input htmlType="password" />
              </FormBinder>
              <FormError style={styles.formItemError} name="password" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>记住密码：</span>
              <FormBinder
                name="checkbox"
              >
                <Checkbox />
              </FormBinder>
            </div>

            <Button type="primary" style={{width: '242px'}}  onClick={this.validateFields}>
              登 录
            </Button>
          </div>
        </FormBinderWrapper>

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
  formItemLabel: {

  },
  formItemError: {
    marginLeft: '10px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10
  }
}

ReactDOM.render(<Login />, mountNode);
````
