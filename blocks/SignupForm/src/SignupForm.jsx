import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Field } from '@icedesign/base';
import IceIcon from '@icedesign/icon';
import './SignupForm.scss';

const FormItem = Form.Item;

export default class SignupForm extends Component {
  static displayName = 'SignupForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  checkPassword = (rule, value, callback) => {
    const { validate } = this.field;
    if (value) {
      validate(['rePasswd']);
    }
    callback();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log(values);
    });
  };

  render() {
    const { init } = this.field;

    return (
      <div className="signup-form" style={styles.signupForm}>
        <div className="form" style={styles.form}>
          <h4>登录</h4>
          <Form field={this.field}>
            <FormItem>
              <IceIcon type="person" size="xs" />
              <Input
                maxLength={20}
                placeholder="会员名/邮箱/手机号"
                {...init('name', {
                  rules: [
                    { required: true, min: 5, message: '用户名至少为 5 个字符' },
                  ],
                })}
              />
            </FormItem>
            <FormItem>
              <IceIcon type="lock" size="xs" />
              <Input
                htmlType="password"
                placeholder="密码"
                {...init('password', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      min: 6,
                      message: '密码至少为 6 个字符',
                    },
                    { validator: this.checkPassword },
                  ],
                })}
              />
            </FormItem>
            <FormItem>
              <Checkbox {...init('agreement')}>记住账号</Checkbox>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>
                登 录
              </Button>
            </FormItem>
            <div className="tips" style={styles.tips}>
              <a href="/">立即注册</a>
              <span>|</span>
              <a href="/">忘记密码</a>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const styles = {
  signupForm: { display: 'flex', justifyContent: 'center' },
  form: { display: 'flex', justifyContent: 'center' },
  tips: {
    textAlign: 'center',
    'a {Color': '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
};
