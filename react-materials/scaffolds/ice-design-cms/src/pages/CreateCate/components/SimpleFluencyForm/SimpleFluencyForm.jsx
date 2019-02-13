import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import cx from 'classnames';
import './SimpleFluencyForm.scss';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const Toast = Message;

export default class SimpleFluencyForm extends Component {
  static displayName = 'SimpleFluencyForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: '',
        shortName: '',
      },
    };
  }

  formChange = (newValue) => {
    this.setState({
      formValue: newValue,
    });
  };

  handleSubmit = () => {
    this.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      console.log('values:', values);
      Toast.success('添加成功');
    });
  };

  render() {
    return (
      <div className={cx('simple-fluency-form', styles.simpleFluencyForm)}>
        <IceContainer className={styles.form}>
          <FormBinderWrapper
            ref={(form) => {
              this.form = form;
            }}
            value={this.state.formValue}
            onChange={this.formChange}
          >
            <div className={styles.formContent}>
              <h2 className={styles.formTitle}>添加分类</h2>
              <Row className={styles.formRow}>
                <Col xxs="6" s="4" l="3" className={styles.formLabel}>
                  <span>分类名称：</span>
                </Col>
                <Col xxs="16" s="10" l="6">
                  <FormBinder name="name" required message="必填项">
                    <Input />
                  </FormBinder>
                  <div className={styles.formErrorWrapper}>
                    <FormError name="name" />
                  </div>
                </Col>
              </Row>
              <Row className={styles.formRow}>
                <Col xxs="6" s="4" l="3" className={styles.formLabel}>
                  <span>缩略名称：</span>
                </Col>
                <Col xxs="16" s="10" l="6">
                  <FormBinder name="shortName" required message="必填项">
                    <Input />
                  </FormBinder>
                  <div className={styles.formErrorWrapper}>
                    <FormError name="shortName" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col offset="3">
                  <Button
                    onClick={this.handleSubmit}
                    type="primary"
                  >
                    确认
                  </Button>
                </Col>
              </Row>
            </div>
          </FormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}
