/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Feedback } from '@icedesign/base';
import AuthForm from '../../components/AuthForm';

export default class UserRegister extends Component {
  static displayName = 'UserRegister';

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
    Feedback.toast.success('注册成功');
    // 注册成功后做对应的逻辑处理
  };

  render() {
    const config = [
      {
        label: '用户名',
        component: 'Input',
        componentProps: {
          placeholder: '请输入用户名',
          size: 'large',
        },
        formBinderProps: {
          name: 'name',
          required: true,
          message: '请输入正确的用户名',
        },
      },
      {
        label: '邮箱',
        component: 'Input',
        componentProps: {
          placeholder: '请输入邮箱',
          size: 'large',
        },
        formBinderProps: {
          type: 'email',
          name: 'email',
          required: true,
          message: '请输入正确的邮箱',
        },
      },
      {
        label: '密码',
        component: 'Input',
        componentProps: {
          placeholder: '至少8位密码',
          size: 'large',
          htmlType: 'password',
        },
        formBinderProps: {
          name: 'passwd',
          required: true,
          message: '请输入正确的密码',
        },
      },
      {
        label: '确认密码',
        component: 'Input',
        componentProps: {
          placeholder: '确认密码',
          size: 'large',
          htmlType: 'password',
        },
        formBinderProps: {
          name: 'rePasswd',
          required: true,
          message: '请输入正确的密码',
        },
      },
      {
        label: '注册',
        component: 'Button',
        componentProps: {
          type: 'primary',
        },
        formBinderProps: {},
      },
    ];

    const initFields = {
      name: '',
      email: '',
      passwd: '',
      rePasswd: '',
    };

    const links = [
      { to: '/', text: '已有账号' },
      { to: '/forgetpassword', text: '找回密码' },
    ];

    return (
      <div className="user-register">
        <AuthForm
          title="注册"
          config={config}
          initFields={initFields}
          links={links}
          formChange={this.formChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
