import React, { Component } from 'react';
import { Grid, Input, Button } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import './JoinUs.scss';

const { Row, Col } = Grid;
const telPattern = /^(1[\d]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$|^([ ]?)$/;

export default class JoinUs extends Component {
  static displayName = 'JoinUs';

  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        username: '',
        email: '',
        phone: '',
        jobtitle: '',
        content: '',
      },
    };
  }

  formChange = (newValue) => {
    this.setState({
      formValue: newValue,
    });
  };

  handleSubmit = () => {
    this.form.validateAll((error, value) => {
      console.log(value);
    });
  };

  render() {
    return (
      <div
        className="join-us"
        style={{
          ...styles.container,
          ...styles.joinUs,
        }}
      >
        <div style={styles.content}>
          <div style={styles.head}>
            <h2 style={styles.title}>我们的团队</h2>
            <p style={styles.intro}>
              我们是一支充满激情、志向远大、怀揣梦想的团队，
              <br />
              也是一个思维活跃、朝气蓬勃、团结互助的大家庭
            </p>
          </div>
          <FormBinderWrapper
            ref={(form) => {
              this.form = form;
            }}
            value={this.state.formValue}
            onChange={this.formChange}
          >
            <div style={styles.formContent}>
              <Row
                wrap
                gutter={20}
                className="hoz-form-item"
                style={styles.hozFormItem}
              >
                <Col span={8}>
                  <FormBinder required message="必填项" name="username">
                    <Input
                      style={{ width: '100%', marginTop: '20px' }}
                      placeholder="姓名"
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="username" style={styles.errorText} />
                  </div>
                </Col>
                <Col span={8}>
                  <FormBinder
                    type="email"
                    required
                    message="邮箱不合法"
                    name="email"
                  >
                    <Input
                      style={{ width: '100%', marginTop: '20px' }}
                      placeholder="邮箱"
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="email" style={styles.errorText} />
                  </div>
                </Col>
                <Col span={8}>
                  <FormBinder
                    required
                    message="请输入合法的电话号码"
                    pattern={telPattern}
                    triggerType="onBlur"
                    name="phone"
                  >
                    <Input
                      style={{ width: '100%', marginTop: '20px' }}
                      placeholder="电话"
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="phone" style={styles.errorText} />
                  </div>
                </Col>
                <Col span={24} style={styles.verFormItem}>
                  <FormBinder name="jobtitle">
                    <Input
                      style={{ width: '100%', marginTop: '20px' }}
                      placeholder="职位"
                    />
                  </FormBinder>
                </Col>
                <Col
                  span={24}
                  className="ver-form-item"
                  style={styles.verFormItem}
                >
                  <FormBinder name="content">
                    <Input.TextArea
                      style={{ width: '100%', marginTop: '20px' }}
                      placeholder="一些自我介绍"
                    />
                  </FormBinder>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button
                    onClick={this.handleSubmit}
                    type="primary"
                    style={styles.submitBtn}
                  >
                    提交
                  </Button>
                </Col>
              </Row>
            </div>
          </FormBinderWrapper>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    background: `url${require('./images/TB1JGoDi3vD8KJjy0FlXXagBFXa-5040-2811.png')}`,
    backgroundSize: 'cover',
  },
  content: {
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0',
  },
  head: { width: '50%', margin: '0 auto' },
  title: { margin: 0, textAlign: 'center', fontSize: '28px', color: '#fff' },
  intro: { textAlign: 'center', color: '#fff' },
  formContent: { maxWidth: '680px', padding: '0 20px', margin: '60px auto' },
  errorText: { color: '#fff' },
  submitBtn: { color: '#2977f3', background: '#fff', borderRadius: '6px' },
  joinUs: {},
  hozFormItem: {},
  verFormItem: {
    marginTop: '20px',
  },
  formErrorWrapper: {
    color: 'red',
  },
};
