/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const { ImageUpload } = Upload;

function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}

export default class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        gender: 'male',
        notice: false,
        email: '',
        avatar: '',
        siteUrl: '',
        githubUrl: '',
        twitterUrl: '',
        description: '',
      },
    };
  }

  onDragOver = () => {
    console.log('dragover callback');
  };

  onDrop = (fileList) => {
    console.log('drop callback : ', fileList);
  };

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>基本设置</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  姓名：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder name="name" required max={10} message="必填">
                    <Input size="large" placeholder="于江水" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  头像：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder name="avatar" required message="必填">
                    <ImageUpload
                      listType="picture-card"
                      action=""
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      locale={{
                        image: {
                          cancel: '取消上传',
                          addPhoto: '上传图片',
                        },
                      }}
                      beforeUpload={beforeUpload}
                      onChange={onChange}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  </IceFormBinder>
                  <IceFormError name="avatar" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  性别：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder name="gender" required message="必填">
                    <RadioGroup>
                      <Radio value="male">男</Radio>
                      <Radio value="female">女</Radio>
                    </RadioGroup>
                  </IceFormBinder>
                  <IceFormError name="gender" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  通知：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder type="boolean" name="notice">
                    <Switch />
                  </IceFormBinder>
                  <IceFormError name="notice" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  邮件：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="请输入正确的邮件"
                  >
                    <Input
                      size="large"
                      placeholder="ice-admin@alibaba-inc.com"
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  website ：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    type="url"
                    name="siteUrl"
                    required
                    message="请输入正确的网站地址"
                  >
                    <Input
                      size="large"
                      type="url"
                      placeholder="https://alibaba.github.io/ice"
                    />
                  </IceFormBinder>
                  <IceFormError name="siteUrl" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  Github：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    type="url"
                    name="githubUrl"
                    required
                    message="请输入正确的 Github 地址"
                  >
                    <Input
                      size="large"
                      placeholder="https://github.com/alibaba/ice"
                    />
                  </IceFormBinder>
                  <IceFormError name="githubUrl" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  Twitter：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder
                    type="url"
                    name="twitterUrl"
                    required
                    message="请输入正确的 Twitter 地址"
                  >
                    <Input size="large" placeholder="https://twitter.com" />
                  </IceFormBinder>
                  <IceFormError name="twitterUrl" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.label}>
                  自我描述：
                </Col>
                <Col xxs="16" s="10" l="6">
                  <IceFormBinder name="description">
                    <Input size="large" multiple placeholder="请输入描述..." />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
