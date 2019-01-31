/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import PageHead from '../../../../components/PageHead';

export default class ReserveForm extends Component {
  state = {
    value: {},
  };

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
        <PageHead title="添加预约" />
        <IceContainer style={{ padding: '40px' }}>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>客户姓名：</div>
              <IceFormBinder name="name" required message="客户姓名必填">
                <Input style={{ width: '400px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>预约服务：</div>
              <IceFormBinder name="service" required message="预约服务必填">
                <Input style={{ width: '400px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="service" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>联系方式：</div>
              <IceFormBinder name="phone" required message="联系方式必填">
                <Input style={{ width: '400px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="phone" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>预约备注：</div>
              <IceFormBinder name="description">
                <Input.TextArea style={{ width: '400px' }} />
              </IceFormBinder>
            </div>
            <Button
              type="primary"
              onClick={this.validateAllFormField}
              style={styles.button}
            >
              提 交
            </Button>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    fontWeight: '450',
    width: '80px',
  },
  formError: {
    marginTop: '10px',
  },
  button: {
    marginLeft: '100px',
  },
};
