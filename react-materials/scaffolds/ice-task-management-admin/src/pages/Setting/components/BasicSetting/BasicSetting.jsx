/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class BasicSetting extends Component {
  static displayName = 'BasicSetting';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        zhName: '飞冰',
        cName: 'ICE',
      },
    };
  }

  formChange = (value) => {
    console.log('value', value);
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log({ values });
      Message.success('提交成功');
    });
  };

  render() {
    return (
      <div>
        <ContainerTitle title="基本设置" />
        <IceContainer style={styles.container}>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>英文名：</div>
                <IceFormBinder>
                  <Input
                    disabled
                    name="cnName"
                    size="large"
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
              </div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>中文名：</div>
                <IceFormBinder>
                  <Input
                    disabled
                    name="zhName"
                    size="large"
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
              </div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>项目简介：</div>
                <IceFormBinder>
                  <Input.TextArea multiple name="description" size="large" style={{ width: '400px' }} />
                </IceFormBinder>
              </div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>仓库地址：</div>
                <IceFormBinder
                  required
                  triggerType="onBlur"
                  message="验证地址必填"
                >
                  <Input
                    type="url"
                    name="url"
                    size="large"
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="url" />
                </div>
              </div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>反馈邮箱：</div>
                <IceFormBinder
                  required
                  triggerType="onBlur"
                  message="邮箱地址必填"
                >
                  <Input
                    type="email"
                    name="email"
                    size="large"
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="email" />
                </div>
              </div>
              <Button
                type="primary"
                size="large"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
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
