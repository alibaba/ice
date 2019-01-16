import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Checkbox,
  Grid,
} from '@alifd/next';

const { Row, Col } = Grid;
const CheckboxGroup = Checkbox.Group;

export default class DeliveryForm extends Component {
  static displayName = 'DeliveryForm';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      value: {
        type: '',
        fee: '',
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log(value);
      if (!error || error.length === 0) {
        this.props.onSubmit();
      }
    });
  }

  render() {
    return (
      <IceFormBinderWrapper
        ref={(formRef) => {
          this.formRef = formRef;
        }}
        value={this.state.value}
        onChange={this.onFormChange}
      >
        <div>
          <h3 style={styles.formTitle}>商品信息</h3>
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              物流公司：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="type" type="array">
                <CheckboxGroup
                  className="next-form-text-align"
                  required
                  message="请选择物流公司"
                  dataSource={[
                    { label: '顺丰', value: 'shunfeng' },
                    { label: '百世汇通', value: 'baishi' },
                  ]}
                />
              </IceFormBinder>
              <IceFormError name="type" />
            </Col>
          </Row>
          <Row style={styles.formItem}>
            <Col xxs="6" s="4" l="3" style={styles.formLabel}>
              配送费用：
            </Col>
            <Col s="12" l="10">
              <IceFormBinder name="fee">
                <Input
                  size="large"
                  placeholder="请输入配送费用"
                />
              </IceFormBinder>
              <IceFormError name="fee" />
            </Col>
          </Row>
          <Row>
            <Col offset={3} style={styles.btns}>
              <Button onClick={this.submit} type="primary">
                下一步
              </Button>
            </Col>
          </Row>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    marginTop: '25px',
    marginBottom: '25px',
  },
};
