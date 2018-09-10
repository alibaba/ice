/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Feedback } from '@icedesign/base';
import { withRouter } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';

@withRouter
export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  formChange = (value) => {
    console.log('formChange:', value);
  };

  handleSubmit = (errors, values) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);
    Feedback.toast.success('登录成功');
    this.props.history.push('/application');
    // 登录成功后做对应的逻辑处理
  };

  render() {
    const config = [
      {
        label: '用户名',
        component: 'Input',
        componentProps: {
          placeholder: '请输入用户名',
          size: 'large',
          maxLength: 20,
        },
        formBinderProps: {
          name: 'name',
          required: true,
          message: '请输入正确的用户名',
        },
      },
      {
        label: '密码',
        component: 'Input',
        componentProps: {
          placeholder: '请输入登录密码',
          htmlType: 'passwd',
        },
        formBinderProps: {
          name: 'passwd',
          required: true,
          message: '请输入正确的密码',
        },
      },
      {
        label: '记住账号',
        component: 'Checkbox',
        componentProps: {},
        formBinderProps: {
          name: 'checkbox',
        },
      },
      {
        label: '登录',
        component: 'Button',
        componentProps: {
          type: 'primary',
        },
        formBinderProps: {},
      },
    ];

    const initFields = {
      name: '',
      passwd: '',
      checkbox: false,
    };

    const links = [
      { to: '/register', text: '立即注册' },
      { to: '/forgetpassword', text: '找回密码' },
    ];

    const extraContent = (
      <div style={styles.loginOther}>
        其他登录方式：
        <a href="#" style={{ ...styles.taobaoIcon, ...styles.icon }} />
        <a href="#" style={{ ...styles.weiboIcon, ...styles.icon }} />
        <a href="#" style={{ ...styles.alipayIcon, ...styles.icon }} />
        <a href="#" style={{ ...styles.dingdingIcon, ...styles.icon }} />
      </div>
    );

    return (
      <AuthForm
        title="登录"
        config={config}
        initFields={initFields}
        formChange={this.formChange}
        handleSubmit={this.handleSubmit}
        links={links}
        extraContent={extraContent}
      />
    );
  }
}

const styles = {
  loginOther: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '25px',
  },
  icon: {
    display: 'inline-block',
    marginRight: '10px',
    width: '22px',
    height: '22px',
    backgroundSize: 'contain',
  },
  taobaoIcon: {
    backgroundImage: `url(${require('./images/taobao.png')})`,
  },
  weiboIcon: {
    backgroundImage: `url(${require('./images/weibo.svg')})`,
  },
  alipayIcon: {
    backgroundImage: `url(${require('./images/alipay.svg')})`,
  },
  dingdingIcon: {
    backgroundImage: `url(${require('./images/dingding.svg')})`,
  },
};
