/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Button, Grid, Message, Icon, Form } from '@alifd/next';
import './Register.scss';

const { Row, Col } = Grid;
const Item = Form.Item;

export default class Register extends Component {
  static displayName = 'Register';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        email: '',
        passwd: '',
        rePasswd: '',
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
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

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

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
    Message.success('注册成功');
    // 注册成功后做对应的逻辑处理
  };

  render() {
    return (
      <div style={styles.container} className="user-register">
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
          <h4 style={styles.formTitle}>注 册</h4>
          <Form
            value={this.state.value}
            onChange={this.formChange}
            size="large"
          >
              <Item
                required
                requiredMessage="请输入正确的用户名"
              >
                <Input name="username" size="large" placeholder="用户名"
                  innerBefore={<Icon
                    type="account"
                    size="small"
                    style={styles.inputIcon}
                  />}
                />
              </Item>
              <Item
                type="email"
                required
                message="请输入正确的邮箱"
              >
                <Input name="email" size="large" maxLength={20} placeholder="邮箱"
                  innerBefore={<Icon type="email" size="small" style={styles.inputIcon} />} />
              </Item>

              <Item
                required
                validator={this.checkPasswd}
              >
                <Input
                  name="passwd"
                  innerBefore={<Icon type="account" test="lock" size="small" style={styles.inputIcon} />}
                  htmlType="password"
                  size="large"
                  placeholder="至少8位密码"
                />
              </Item>
              <Item
                required
                validator={(rule, values, callback) =>
                  this.checkPasswd2(
                    rule,
                    values,
                    callback,
                    this.state.value
                  )
                }
              >
                <Input name="rePasswd"
                  innerBefore={<Icon type="email" test="lock" size="small" style={styles.inputIcon} />}
                  htmlType="password"
                  size="large"
                  placeholder="确认密码"
                />
              </Item>


              <Row style={styles.formItem}>
                <Form.Submit
                  type="primary"
                  validate
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  注 册
                </Form.Submit>
              </Row>

              <Row style={styles.tips}>
                <a href="/" style={styles.link}>
                  使用已有账户登录
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
