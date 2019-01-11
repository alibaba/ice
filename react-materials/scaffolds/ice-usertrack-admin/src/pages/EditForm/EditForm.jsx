/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Radio,
  DatePicker,
  Grid,
  Message,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

export default class EditForm extends Component {
  state = {
    value: {},
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values);
      Message.success('编辑成功');
    });
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <IceFormBinderWrapper value={this.state.value} ref="form">
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>编辑</h2>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                创建人：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="name" required max={10} message="必填">
                  <Input
                    style={styles.inputItem}

                    placeholder="淘小宝"
                  />
                </IceFormBinder>
                <IceFormError name="name" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                应用名称：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="appName" required max={10} message="必填">
                  <Input
                    style={styles.inputItem}

                    placeholder="淘小宝"
                  />
                </IceFormBinder>
                <IceFormError name="appName" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                自动告警：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="report" required message="必填">
                  <RadioGroup>
                    <Radio value="y">是</Radio>
                    <Radio value="n">否</Radio>
                  </RadioGroup>
                </IceFormBinder>
                <IceFormError name="report" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                创建时间：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="createTime" required message="必填">
                  <DatePicker />
                </IceFormBinder>
                <IceFormError name="createTime" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                更新时间：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="updateTime" required message="必填">
                  <DatePicker />
                </IceFormBinder>
                <IceFormError name="updateTime" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col xxs="6" s="3" l="3" style={styles.label}>
                应用描述：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="description">
                  <Input.TextArea
                    style={styles.inputItem}

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
              保存
            </Button>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
  },
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
