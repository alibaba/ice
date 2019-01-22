/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Grid, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';

const { Row, Col } = Grid;

@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      console.log(values);
      Message.success('登录成功');
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>登 录</h4>
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
              <IceFormBinder name="username" required message="必填">
                <Input
                  maxLength={20}
                  placeholder="用户名"
                  className={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="username" />
            </div>

            <div className={styles.formItem}>
              <IceIcon type="lock" size="small" className={styles.inputIcon} />
              <IceFormBinder name="password" required message="必填">
                <Input
                  htmlType="password"
                  placeholder="密码"
                  className={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="password" />
            </div>

            <div className={styles.formItem}>
              <IceFormBinder name="checkbox">
                <Checkbox className={styles.checkbox}>记住账号</Checkbox>
              </IceFormBinder>
            </div>

            <div className={styles.footer}>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                className={styles.submitBtn}
              >
                登 录
              </Button>
              <Link to="/user/register" className={styles.tips}>
                立即注册
              </Link>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

export default UserLogin;
