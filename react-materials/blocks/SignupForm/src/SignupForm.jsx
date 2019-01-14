/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Icon, Button, Checkbox, Grid, Form } from '@alifd/next';
import './SignupForm.scss';

const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class SignupForm extends Component {
  static displayName = 'SignupForm';

  handleSubmit = (values, errors) => {
    console.log('error', errors, 'value', values);
    if (!errors) {
      // 提交当前填写的数据
    } else {
      // 处理表单报错
    }
  };

  render() {
    return (
      <div className="signup-form" style={styles.signupForm}>
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>登录</h4>
          <Form>
            <FormItem required requiredMessage="必填" style={styles.formItem}>
              <Input innerBefore={<Icon type="account" size="small" />} name="account" hasBorder={false} maxLength={20} placeholder="会员名/邮箱/手机号" 
              />
            </FormItem>

            <FormItem  style={styles.formItem} required requiredMessage="必填" >
              <Input innerBefore={<Icon type="set" size="small" />} name="password" hasBorder={false} htmlType="password" placeholder="密码" />
            </FormItem>

            <FormItem style={styles.formItem}>
              <Checkbox name="checkbox">记住账号</Checkbox>
            </FormItem>

            <FormItem style={styles.formItem}>
              <Form.Submit
                type="primary"
                validate
                onClick={this.handleSubmit}
                style={styles.submitBtn}
              >
                登 录
                </Form.Submit >
            </FormItem>

            <Row className="tips" style={styles.tips}>
              <a href="/" style={styles.link}>
                立即注册
                </a>
              <span style={styles.line}>|</span>
              <a href="/" style={styles.link}>
                忘记密码
                </a>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
