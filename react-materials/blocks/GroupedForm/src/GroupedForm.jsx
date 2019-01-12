import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Select,
  Checkbox,
  Grid,
} from '@alifd/next';

const { Row, Col } = Grid;
const CheckboxGroup = Checkbox.Group;

export default class GroupedForm extends Component {
  static displayName = 'GroupedForm';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      value: {
        title: '',
        price: '',
        desc: '',
        type: '',
        deliveryType: '',
        deliveryFee: '',
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        title: '',
        price: '',
        desc: '',
        type: '',
        deliveryType: '',
        deliveryFee: '',
      },
    });
  }

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
      }
      // 提交当前填写的数据
    });
  };

  render() {
    return (
      <div className="grouped-form">
        <IceContainer title="商品发布" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>

              <div style={styles.subForm}>
                <h3 style={styles.formTitle}>商品信息</h3>
                <div>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      宝贝标题：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="title">
                        <Input
                          size="large"
                          required
                          placeholder="请输入宝贝标题"
                          message="宝贝标题必须填写"
                          style={{ width: '100%' }}
                        />
                      </IceFormBinder>
                      <IceFormError name="title" />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      商品类型：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="type">
                        <Select
                          className="next-form-text-align"
                          required
                          size="large"
                          style={{ width: '30%' }}
                          message="请选择商品类型"
                          dataSource={[
                            { label: '全新', value: 'new' },
                            { label: '二手', value: 'secondhand' },
                          ]}
                        />
                      </IceFormBinder>
                      <IceFormError name="type" />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      宝贝价格：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="price">
                        <Input
                          size="large"
                          required
                          placeholder="请输入宝贝价格"
                          message="宝贝价格必须填写"
                        />
                      </IceFormBinder>
                      <IceFormError name="price" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      宝贝描述：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="desc">
                        <Input.TextArea style={{ width: '100%' }} />
                      </IceFormBinder>
                    </Col>
                  </Row>
                </div>
              </div>

              <div style={styles.subForm}>
                <h3 style={styles.formTitle}>物流服务</h3>
                <div>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      物流公司：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="deliveryType" type="array">
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
                      <IceFormError name="deliveryType" />
                    </Col>
                  </Row>
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="3" l="3" style={styles.formLabel}>
                      配送费用：
                    </Col>
                    <Col s="12" l="10">
                      <IceFormBinder name="deliveryFee">
                        <Input
                          size="large"
                          placeholder="请输入配送费用"
                        />
                      </IceFormBinder>
                      <IceFormError name="deliveryFee" />
                    </Col>
                  </Row>
                </div>
              </div>

              <Row style={styles.btns}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="12" l="10">
                  <Button type="primary" onClick={this.submit}>
                    立即创建
                  </Button>
                  <Button style={styles.resetBtn} onClick={this.reset}>
                    重置
                  </Button>
                </Col>
              </Row>

            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  subForm: {
    marginBottom: '20px',
  },
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
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
