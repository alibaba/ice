/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Grid, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';

const { Row, Col } = Grid;

@withRouter
class UserRegister extends Component {
  static displayName = 'UserRegister';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
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

  handleSubmit = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      console.log(values);
      Message.success('注册成功');
      this.props.history.push('/user/login');
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>注 册</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div className={styles.formItems}>
            <div className={styles.formItem}>
              <IceIcon
                type="person"
                size="small"
                className={styles.inputIcon}
              />
              <IceFormBinder name="name" required message="请输入正确的用户名">
                <Input placeholder="用户名" className={styles.inputCol} />
              </IceFormBinder>
              <IceFormError name="name" />
            </div>

            <div className={styles.formItem}>
              <IceIcon type="mail" size="small" className={styles.inputIcon} />
              <IceFormBinder
                type="email"
                name="email"
                required
                message="请输入正确的邮箱"
              >
                <Input
                  maxLength={20}
                  placeholder="邮箱"
                  className={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="email" />
            </div>

            <div className={styles.formItem}>
              <IceIcon type="lock" size="small" className={styles.inputIcon} />
              <IceFormBinder
                name="passwd"
                required
                validator={this.checkPasswd}
              >
                <Input
                  htmlType="password"
                  placeholder="至少8位密码"
                  className={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="passwd" />
            </div>

            <div className={styles.formItem}>
              <IceIcon type="lock" size="small" className={styles.inputIcon} />
              <IceFormBinder
                name="rePasswd"
                required
                validator={(rule, values, callback) =>
                  this.checkPasswd2(rule, values, callback, this.state.value)
                }
              >
                <Input
                  htmlType="password"
                  placeholder="确认密码"
                  className={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="rePasswd" />
            </div>

            <div className="footer">
              <Button
                type="primary"
                onClick={this.handleSubmit}
                className={styles.submitBtn}
              >
                注 册
              </Button>
              <Link to="/user/login" className={styles.tips}>
                使用已有账户登录
              </Link>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

export default UserRegister;
