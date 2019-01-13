/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Radio, Switch, Grid } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

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
                    style={{ background: '#447eff', borderColor: '#447eff' }}
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
