import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Field } from '@icedesign/base';
import IceIcon from '@icedesign/icon';
import './UserLogin.scss';

const FormItem = Form.Item;

// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage =
  'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';

export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
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
      <div style={styles.userLogin} className="user-login">
        <div
          style={{
            ...styles.userLoginBg,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        <div style={styles.contentWrapper}>
          <h2 style={styles.slogan}>
            欢迎使用 <br /> ICE 内容管理系统
          </h2>
          <div className="form" style={styles.formContent}>
            <h4 style={styles.formTitle}>登录</h4>
            <Form field={this.field}>
              <FormItem style={styles.formItem}>
                <IceIcon type="person" size="xs" />
                <Input
                  maxLength={20}
                  placeholder="会员名/邮箱/手机号"
                  {...init('name', {
                    rules: [
                      {
                        required: true,
                        min: 5,
                        message: '用户名至少为 5 个字符',
                      },
                    ],
                  })}
                />
              </FormItem>
              <FormItem style={styles.formItem}>
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
              <FormItem style={styles.formItem}>
                <Checkbox {...init('agreement')}>记住账号</Checkbox>
              </FormItem>
              <FormItem style={styles.formItem}>
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  登 录
                </Button>
              </FormItem>
              <div className="tips" style={styles.tips}>
                <a href="/" style={styles.link}>
                  立即注册
                </a>
                <span style={styles.line}>|</span>
                <a href="/" style={styles.link}>
                  忘记密码
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  contentWrapper: {
    position: 'absolute',
    top: '-100px',
    left: 0,
    right: 0,
    bottom: 0,
    maxWidth: '1080px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  slogan: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '36px',
    letterSpacing: '2px',
    lineHeight: '48px',
  },
  formContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    marginBottom: '25px',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
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
