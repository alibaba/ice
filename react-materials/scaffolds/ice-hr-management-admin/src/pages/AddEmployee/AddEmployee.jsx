import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Input, Button, Message, Select } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const Toast = Message;

export default class AddEmployee extends Component {
  state = {
    formValue: {
      name: '',
      shortName: '',
    },
  };

  formChange = (value) => {
    console.log(value);
  };

  handleSubmit = () => {
    this.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      console.log('values:', values);
      Toast.success('提交成功');
    });
  };

  render() {
    return (
      <IceContainer style={styles.form}>
        <FormBinderWrapper
          ref={(form) => {
            this.form = form;
          }}
          value={this.state.formValue}
          onChange={this.formChange}
        >
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>添加员工</h2>
            <Row style={styles.formRow}>
              <Col l="2" style={styles.formLabel}>
                <span>姓名：</span>
              </Col>
              <Col l="5">
                <FormBinder name="name" required message="必填项">
                  <Input
                    name="name"
                    placeholder="淘小宝"
                    style={{ width: '300px' }}
                  />
                </FormBinder>
                <div style={styles.formErrorWrapper}>
                  <FormError name="name" />
                </div>
              </Col>
            </Row>

            <Row style={styles.formRow}>
              <Col l="2" style={styles.formLabel}>
                <span>邮箱：</span>
              </Col>
              <Col l="5">
                <FormBinder
                  type="email"
                  name="email"
                  required
                  message="请输入正确的邮箱"
                >
                  <Input
                    maxLength={20}
                    placeholder="邮箱"
                    style={{ width: '300px' }}
                  />
                </FormBinder>
                <div style={styles.formErrorWrapper}>
                  <FormError name="email" />
                </div>
              </Col>
            </Row>

            <Row style={styles.formRow}>
              <Col l="2" style={styles.formLabel}>
                <span>角色：</span>
              </Col>
              <Col l="5">
                <FormBinder name="role">
                  <Select style={{ width: '300px' }}>
                    <Select.Option value="member">Member</Select.Option>
                    <Select.Option value="owner">Owner</Select.Option>
                  </Select>
                </FormBinder>
                <div style={styles.formErrorWrapper}>
                  <FormError name="role" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col offset="2">
                <Button onClick={this.handleSubmit} type="primary">
                  确认
                </Button>
              </Col>
            </Row>
          </div>
        </FormBinderWrapper>
      </IceContainer>
    );
  }
}

const styles = {
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  formLabel: {
    textAlign: 'right',
    lineHeight: '1.7rem',
    paddingRight: '10px',
  },
  formRow: {
    marginBottom: '20px',
  },
  formErrorWrapper: {
    marginTop: '5px',
  },
};
