'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox, Field } from '@icedesign/base';
import IceIcon from '@icedesign/icon';
import './RegisterForm.scss';

const FormItem = Form.Item;

export default class RegisterForm extends Component {
  static displayName = 'RegisterForm';

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  checkPass(rule, value, callback) {
    const { validate } = this.field;
    if (value) {
      validate(['rePasswd']);
    }
    callback();
  }

  checkPass2(rule, value, callback) {
    const { getValue } = this.field;
    if (value && value !== getValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log(values);
    });
  }

  render() {
    const { init } = this.field;

    return (
      <div className="register-form">
        <div className="form">
          <h4>注册</h4>
          <Form field={this.field} >
            <FormItem>
              <IceIcon type="person" size="xs" />
              <Input maxLength={20} placeholder="姓名"
                {...init('name', {
                  rules: [
                    {required: true, min: 5, message: '用户名至少为 5 个字符'}
                  ],
                })}
              />
            </FormItem>
            <FormItem>
              <IceIcon type="mail" size="xs" />
              <Input type="email" placeholder="邮箱"
                {...init('email', {
                  rules: [
                    {required: true, trigger: 'onBlur', message: '请输入正确的邮箱地址'},
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['onBlur', 'onChange']}
                  ]
                })}
              />
            </FormItem>
            <FormItem>
              <IceIcon type="lock" size="xs" />
              <Input htmlType="password" placeholder="请输入密码"
                {...init('passwd', {
                  rules: [
                      {required: true, whitespace: true, message: '请填写密码'},
                      {validator: this.checkPass.bind(this)},
                  ],
                })}
              />
            </FormItem>
            <FormItem>
            <IceIcon type="lock" size="xs" />
              <Input htmlType="password" placeholder="两次输入密码保持一致"
                {...init('rePasswd', {
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: '请再次输入密码',
                  }, {
                    validator: this.checkPass2.bind(this),
                  }],
                })}
              />
            </FormItem>
            <FormItem>
              <Checkbox {...init('agreement')} >同意注册条款</Checkbox>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit.bind(this)}>注 册</Button>
            </FormItem>
            <div className="tips">
              <a href="/">登 录</a>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
