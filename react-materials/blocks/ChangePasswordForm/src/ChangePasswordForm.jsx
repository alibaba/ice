/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form } from '@alifd/next';

import './ChangePasswordForm.scss';

const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 7, s: 4, l: 3 },
  wrapperCol: { xxs: 16, s: 10, l: 7 },
};

export default class ChangePasswordForm extends Component {
  static displayName = 'ChangePasswordForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        passwd: '',
        rePasswd: '',
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    console.log('stateValues:', stateValues);
    if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = (values, errors) => {
    console.log('error', errors, 'value', values);
    if (!errors) {
      // 提交当前填写的数据
    } else {
      // 处理表单报错
    }
  };

  render() {
    return (
      <div className="change-password-form">
        <IceContainer>
          <Form
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
            size="large"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>修改密码</h2>
              <FormItem
                label="新密码："
                {...formItemLayout}
                validator={this.checkPasswd}
              >
                <Input
                  name="passwd"
                  htmlType="password"
                  size="large"
                  placeholder="请重新输入新密码"
                />
              </FormItem>
              <FormItem
                label="确认密码："
                {...formItemLayout}
                validator={(rule, values, callback) =>
                  this.checkPasswd2(rule, values, callback, this.state.value)
                }
              >
                <Input
                  name="rePasswd"
                  htmlType="password"
                  size="large"
                  placeholder="两次输入密码保持一致"
                />
              </FormItem>
            </div>

            <Row wrap style={{ marginTop: 20 }}>
              <Col xxs={{ offset: 6 }} s={{ offset: 3 }}>
                <Form.Submit
                  size="large"
                  validate
                  type="primary"
                  onClick={this.validateAllFormField}
                >
                  提 交
                </Form.Submit>
              </Col>
            </Row>
          </Form>
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
