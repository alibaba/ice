/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Checkbox, Grid, Message, Icon, Form } from '@alifd/next';
import './Login.scss';

const { Row, Col } = Grid;
const Item = Form.Item;

export default class Login extends Component {
  static displayName = 'Login';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        account: '',
        password: '',
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (values, errors) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);
    Message.success('登录成功');
    // 登录成功后做对应的逻辑处理
  };

  render() {
    return (
      <div style={styles.container} className="user-login">
        <div style={styles.header}>
          <a href="#" style={styles.meta}>
            <img
              style={styles.logo}
              src={require('./images/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png')}
              alt="logo"
            />
            <span style={styles.title}>飞冰</span>
          </a>
          <p style={styles.desc}>飞冰让前端开发简单而友好</p>
        </div>
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>登 录</h4>
          <Form
            value={this.state.value}
            onChange={this.formChange}
            size="large"
            ref="form"
          >
            <Item required requiredMessage="必填">
              <Input
                name="account"
                innerBefore={<Icon
                  type="account"
                  size="small"
                  style={styles.inputIcon}
                />}
                size="large"
                maxLength={20}
                placeholder="管理员账号"
              />
            </Item>
            <Item required requiredMessage="必填">
              <Input
                name="password"
                innerBefore={<Icon type="account" size="small" style={styles.inputIcon} test="lock" />}
                size="large"
                htmlType="password"
                placeholder="密码"
              />
            </Item>
            <Item >
              <Checkbox name="checkbox" style={styles.checkbox}>记住账号</Checkbox>
            </Item>


            <Row style={styles.formItem}>
              <Form.Submit
                type="primary"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
                validate
              >
                登 录
                </Form.Submit>
            </Row>

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
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    paddingTop: '100px',
    background: '#f0f2f5',
    backgroundImage: `url${require('./images/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png')}`,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  title: {
    textAlign: 'center',
    fontSize: '33px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: 'Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif',
    fontWeight: '600',
  },
  desc: {
    margin: '10px 0',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.45)',
  },
  logo: {
    marginRight: '10px',
    width: '48px',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '368px',
    margin: '0 auto',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
    padding: '0',
  },
  formItemCol: {
    position: 'relative',
    padding: '0',
  },
  formTitle: {
    textAlign: 'center',
    margin: '0 0 20px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
  },
  submitBtn: {
    fontSize: '16px',
    height: '40px',
    lineHeight: '40px',
    background: '#3080fe',
    borderRadius: '4px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    justifyContent: 'center',
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
