/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Upload, Grid } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

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

export default class BaseSetting extends Component {
  static displayName = 'BaseSetting';

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

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
    });
  };

  render() {
    return (
      <IceContainer>
        <IceFormBinderWrapper value={this.state.value} ref="form">
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>个人设置</h2>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                姓名：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="name" required max={10} message="必填">
                  <Input style={styles.inputItem} placeholder="淘小宝" />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                头像：
              </Col>
              <Col s="12" l="10">
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
              <Col xxs="6" s="3" l="3" style={styles.label}>
                性别：
              </Col>
              <Col s="12" l="10">
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
              <Col xxs="6" s="3" l="3" style={styles.label}>
                通知：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder type="boolean" name="notice">
                  <Switch
                    style={{ background: '#2077ff', borderColor: '#2077ff' }}
                  />
                </IceFormBinder>
                <IceFormError name="notice" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                邮件：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder
                  type="email"
                  name="email"
                  required
                  message="请输入正确的邮件"
                >
                  <Input
                    style={styles.inputItem}
                    placeholder="ice-admin@alibaba-inc.com"
                  />
                </IceFormBinder>
                <IceFormError name="email" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                网站地址 ：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder
                  type="url"
                  name="siteUrl"
                  required
                  message="请输入正确的网站地址"
                >
                  <Input
                    style={styles.inputItem}
                    type="url"
                    placeholder="https://alibaba.github.io/ice"
                  />
                </IceFormBinder>
                <IceFormError
                  style={{ marginLeft: 10 }}
                  name="siteUrl"
                  required
                  message="请输入正确的网站地址"
                />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                Github：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder
                  type="url"
                  name="githubUrl"
                  required
                  message="请输入正确的 Github 地址"
                >
                  <Input
                    style={styles.inputItem}
                    placeholder="https://github.com/alibaba/ice"
                  />
                </IceFormBinder>
                <IceFormError name="githubUrl" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                Twitter：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder
                  type="url"
                  name="twitterUrl"
                  required
                  message="请输入正确的 Twitter 地址"
                >
                  <Input
                    style={styles.inputItem}
                    placeholder="https://twitter.com"
                  />
                </IceFormBinder>
                <IceFormError name="twitterUrl" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                自我描述：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="description">
                  <Input
                    style={styles.inputItem}
                    multiple
                    placeholder="请输入描述..."
                  />
                </IceFormBinder>
                <IceFormError name="description" />
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>

        <Row style={{ marginTop: 20 }}>
          <Col offset="3">
            <Button
              type="primary"
              style={{ width: 100 }}
              onClick={this.validateAllFormField}
            >
              更新设置
            </Button>
          </Col>
        </Row>
      </IceContainer>
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
    color: '#333',
  },
  inputItem: {
    width: '100%',
  },
};
