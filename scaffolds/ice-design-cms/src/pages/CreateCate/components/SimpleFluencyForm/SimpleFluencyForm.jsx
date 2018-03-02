import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Input, Button, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import './SimpleFluencyForm.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

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
      <div className="simple-fluency-form" style={styles.simpleFluencyForm}>
        <IceContainer style={styles.form}>
          <FormBinderWrapper
            ref={(form) => {
              this.form = form;
            }}
            value={this.state.formValue}
            onChange={this.formChange}
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加分类</h2>
              <Row style={styles.formRow}>
                <Col span={2} style={styles.formLabel}>
                  <span>分类名称：</span>
                </Col>
                <Col span={6}>
                  <FormBinder required message="必填项">
                    <Input name="name" />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="name" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={2} style={styles.formLabel}>
                  <span>缩略名称：</span>
                </Col>
                <Col span={6}>
                  <FormBinder required message="必填项">
                    <Input name="shortName" />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="shortName" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col offset={2}>
                  <Button
                    onClick={this.handleSubmit}
                    type="primary"
                    size="large"
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
  simpleFluencyForm: {},
};
