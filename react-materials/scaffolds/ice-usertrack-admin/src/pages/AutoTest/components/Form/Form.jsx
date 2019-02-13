/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { withRouter } from 'react-router-dom';

@withRouter
export default class Form extends Component {
  state = {
    value: {
      title: '',
    },
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values);
      Message.success('提交成功');
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.title}>自动化测试 URL</div>
        <div style={styles.summary}>
          <p>您可输需要测试的URL地址，会调用自动化验证接口进行验证。</p>
          <p>验证结束后会将验证结果发至测试人，请注意查收邮箱。</p>
        </div>
        <IceFormBinderWrapper value={this.state.value} ref="form">
          <div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>验证地址：</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="验证地址必填"
                name="url"
              >
                <Input
                  placeholder="https://alibaba.github.io/ice/"
                  type="url"

                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="url" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>接收邮箱：</div>
              <IceFormBinder
                required
                name="email"
                triggerType="onBlur"
                message="邮箱地址必填"
              >
                <Input
                  placeholder="abc@example.com"
                  type="email"

                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="email" />
              </div>
            </div>
            <Button
              type="primary"

              onClick={this.validateAllFormField}
            >
              提 交
            </Button>
          </div>
        </IceFormBinderWrapper>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
  },
  title: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0,.85)',
  },
  summary: {
    margin: '0 0 20px',
  },
  formItem: {
    marginBottom: '20px',
  },
  formLabel: {
    marginBottom: '10px',
  },
  formError: {
    marginTop: '10px',
  },
};
