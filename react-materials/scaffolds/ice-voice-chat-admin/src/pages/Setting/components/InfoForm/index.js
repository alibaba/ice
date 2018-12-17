/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Group: RadioGroup } = Radio;

export default class infoForm extends Component {
  static displayName = 'infoForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        project: 'weather',
        status: 'yes',
        appid: 'wdjwe2309ew',
        token: '2wedwjewjndfmsnjancdnsdmcnms',
        desc: '',
      },
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        Feedback.toast.error('请输入完整的信息');
        return;
      }
      console.log({ values });
      Feedback.toast.success('保存成功');
    });
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>项目名称</div>
              <IceFormBinder>
                <Input name="project" size="large" style={{ width: '400px' }} />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>AppId</div>
              <IceFormBinder>
                <Input
                  name="appid"
                  size="large"
                  style={{ width: '400px' }}
                  disabled
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>Token</div>
              <IceFormBinder>
                <Input
                  name="token"
                  size="large"
                  style={{ width: '400px' }}
                  disabled
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>允许回复</div>
              <IceFormBinder>
                <RadioGroup
                  name="status"
                  dataSource={[
                    {
                      value: 'yes',
                      label: '是',
                    },
                    {
                      value: 'no',
                      label: '否',
                    },
                  ]}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>项目描述</div>
              <IceFormBinder>
                <Input
                  multiple
                  placeholder="这里是一段描述"
                  name="desc"
                  size="large"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
            </div>
            <Button
              type="primary"
              size="large"
              style={styles.submitButton}
              onClick={this.validateAllFormField}
            >
              保 存
            </Button>
          </div>
        </IceFormBinderWrapper>
      </IceContainer>
    );
  }
}

const styles = {
  formContent: {
    marginLeft: '30px',
  },
  formItem: {
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    width: '70px',
    marginRight: '15px',
    textAlign: 'right',
  },
  formError: {
    marginLeft: '10px',
  },
  submitButton: {
    marginLeft: '85px',
  },
};
