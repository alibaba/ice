import React, { Component } from 'react';
import { Input, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';

export default class ForgetPasswordForm extends Component {
  static displayName = 'ForgetPasswordForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  // ICE: React Component 的生命周期

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  emailChange = (newValue) => {
    this.setState(newValue);
  };

  sendMessage = () => {
    this.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <IceContainer>
        <div style={styles.title}>忘记密码</div>
        <div style={styles.subtitle}>
          填入您的邮箱，重置后的密码会发到您的邮箱
        </div>
        <div style={styles.groupTitle}>邮箱地址：</div>
        <div style={styles.inputWrap}>
          <FormBinderWrapper
            ref={(form) => {
              this.form = form;
            }}
            value={{
              email: this.state.email,
            }}
            onChange={this.emailChange}
          >
            <div>
              <FormBinder
                required
                type="email"
                message="Email 地址不合法, 请检查"
              >
                <Input
                  style={styles.input}
                  name="email"
                  placeholder="请输入邮箱地址"
                />
              </FormBinder>
              <div>
                <FormError name="email" />
              </div>
            </div>
          </FormBinderWrapper>
        </div>

        <div style={styles.btnWrap}>
          <Button type="primary" onClick={this.sendMessage}>
            发送新密码
          </Button>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  title: {
    fontSize: '16px',
    margin: '0 0 10px',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: '12px',
    marginBottom: '20px',
  },
  groupTitle: {
    marginBottom: '10px',
  },
  input: {
    maxWidth: '332px',
    width: '70%',
    minWidth: '150px',
  },
  inputWrap: { marginBottom: '20px' },
};
