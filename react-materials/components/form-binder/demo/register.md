---
title: 注册表单
order: 2
importStyle: true
---

普通的注册表单，展示多表单元素的组合，用户填写必须的信息才能注册新用户。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { Input, Button, Checkbox, Message, CascaderSelect, Switch, DatePicker } from '@alifd/next';

const cityData = [
  {
    value: "2973",
    label: "陕西",
    children: [
      {
        value: "2974",
        label: "西安",
        children: [
          { value: "2975", label: "西安市" },
          { value: "2976", label: "高陵县" }
        ]
      },
      {
        value: "2980",
        label: "铜川",
        children: [
          { value: "2981", label: "铜川市" },
          { value: "2982", label: "宜君县" }
        ]
      }
    ]
  },
  {
    value: "3371",
    label: "新疆",
    children: [
      {
        value: "3430",
        label: "巴音郭楞蒙古自治州",
        children: [
          { value: "3431", label: "库尔勒市" },
          { value: "3432", label: "和静县" }
        ]
      }
    ]
  }
];

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        birthdate: '',
        city: '',
        notification: false,
        agreement: false,
      }
    };
  }

  formChange = value => {
    // 说明：
    //  1. 表单是双向通行的，所有表单的响应数据都会同步更新 value
    //  2. 这里 setState 只是为了实时展示当前表单数据的演示使用
    this.setState({ value });
  };

  checkPassword = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkConfirmPassword = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== this.state.value.password) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  validateFields = () => {
    const { validateFields } = this.refs.form;

    validateFields((errors, values) => {
      console.log({ errors })

      if (!errors) {
        Message.success('注册成功')
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
              <span style={styles.formItemLabel}>邮箱：</span>
              <FormBinder name="email" required type="email" message="请输入正确的邮箱" >
                <Input placeholder="ice-admin@alibaba-inc.com" />
              </FormBinder>
              <FormError style={styles.formItemError} name="email" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>昵称：</span>
              <FormBinder name="nickname" required message="请输入正确的昵称" >
                <Input placeholder="淘小宝" />
              </FormBinder>
              <FormError style={styles.formItemError} name="nickname" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>密码：</span>
              <FormBinder name="password" required validator={this.checkPassword}>
                <Input htmlType="password" placeholder="输入密码" />
              </FormBinder>
              <FormError style={styles.formItemError} name="password" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>确认密码：</span>
              <FormBinder name="confirmPassword" required validator={this.checkConfirmPassword}>
                <Input htmlType="password" placeholder="输入确认密码" />
              </FormBinder>
              <FormError style={styles.formItemError} name="confirmPassword" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>出生日期：</span>
                <FormBinder name="birthdate" getFieldValue={(date, formatDate) => { return formatDate }}>
                  <DatePicker format="YYYY-MM-DD" style={{ width: '200px' }} />
                </FormBinder>
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>籍贯地址：</span>
              <FormBinder name="city" >
                <CascaderSelect dataSource={cityData} style={{ width: '200px' }} />
              </FormBinder>
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>开启通知：</span>
              <FormBinder name="notification" valuePropName="checked">
                <Switch />
              </FormBinder>
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>用户协议：</span>
              <FormBinder
                name="agreement"
                valuePropName="checked"
              >
                <Checkbox />
              </FormBinder>
            </div>

            <Button type="primary" style={{width: '270px'}}  onClick={this.validateFields}>
              注 册
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
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  formItemLabel: {
    width: '70px',
    mariginRight: '10px',
    display: 'inline-block',
    textAlign: 'right',
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

ReactDOM.render(<Register />, mountNode);
````
