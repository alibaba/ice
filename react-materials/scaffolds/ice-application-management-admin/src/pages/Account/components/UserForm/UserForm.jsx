/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const Toast = Message;

const { Row, Col } = Grid;
export default class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        operationType: 'add',
        os: 'Linux',
        permission: '1',
        term: 'week',
        content: '',
        reason: '',
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log(errors);
      console.log('values', values);

      if (!errors) {
        this.submit();
      }
    });
  };

  submit = () => {
    Toast.success('提交成功');
    this.setState({
      value: {},
    });
  };

  render() {
    const { value: formValue } = this.state;

    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>服务器账号申请</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  操作类型：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="operationType">
                    <Select
                      style={{ width: '100%' }}
                      value={formValue.operationType}
                      dataSource={[
                        { label: '账号添加', value: 'add' },
                        { label: '账号删除', value: 'delete' },
                      ]}
                    />
                  </IceFormBinder>
                  <IceFormError name="operationType" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  操作系统：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="os">
                    <Select
                      style={{ width: '100%' }}
                      value={formValue.os}
                      dataSource={[{ label: 'Linux', value: 'Linux' }]}
                    />
                  </IceFormBinder>
                  <IceFormError name="os" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  操作权限：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="permission">
                    <Select
                      style={{ width: '100%' }}
                      value={formValue.permission}
                      dataSource={[
                        { label: '一般用户', value: '1' },
                        { label: '应用管理员', value: '2' },
                        { label: '系统管理员', value: '3' },
                      ]}
                    />
                  </IceFormBinder>
                  <IceFormError name="permission" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  操作期限：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="term">
                    <Select
                      style={{ width: '100%' }}
                      value={formValue.term}
                      dataSource={[
                        { label: '一周', value: 'week' },
                        { label: '一个月', value: 'month' },
                        { label: '一年', value: 'year' },
                      ]}
                    />
                  </IceFormBinder>
                  <IceFormError name="term" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  申请内容：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="content"
                    required
                    message="请输入申请内容"
                  >
                    <Input.TextArea
                      style={{ width: '100%' }}
                      value={formValue.content}
                      placeholder="请输入机器ip，支持多个，逗号或换行分割"
                    />
                  </IceFormBinder>
                  <IceFormError name="content" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  申请理由：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="reason"
                    required
                    message="请输入申请理由"
                  >
                    <Input.TextArea
                      value={formValue.reason}
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="reason" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button type="primary" onClick={this.validateAllFormField}>
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
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
