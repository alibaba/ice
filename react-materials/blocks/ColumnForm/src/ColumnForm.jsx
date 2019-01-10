import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Select, Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class ColumnForm extends Component {
  static displayName = 'ColumnForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        contractId: '',
        operator: '',
        settleAccount: '',
        period: '',
        currency: 'usd',
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
        contractId: '',
        operator: '',
        settleAccount: '',
        period: '',
        currency: 'usd',
      },
    });
  };

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
      <div className="column-form">
        <IceContainer title="运营商录入" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              <Row wrap>
                <Col xxs="24" s="12" l="12">
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      合同编号：
                    </Col>

                    <Col s="12" l="12">
                      <IceFormBinder
                        name="contractId"
                        required
                        message="合同编号必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="contractId" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      签约运营商：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder
                        name="operator"
                        required
                        message="签约运营商必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="operator" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      计费周期：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder name="period">
                        <Select
                          className="next-form-text-align"
                          style={{ width: '100%' }}
                          required
                          message="请选择计费周期"
                          dataSource={[
                            { label: '按月结算', value: 'month' },
                            { label: '按季度结算', value: 'season' },
                            { label: '按年结算', value: 'year' },
                          ]}
                        />
                      </IceFormBinder>
                      <IceFormError name="period" />
                    </Col>
                  </Row>
                </Col>

                <Col xxs="24" s="12" l="12">
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      结算运营商：
                    </Col>

                    <Col s="12" l="12">
                      <IceFormBinder
                        name="settleAccount"
                        required
                        message="结算运营商必须填写"
                      >
                        <Input style={{ width: '100%' }} />
                      </IceFormBinder>
                      <IceFormError name="settleAccount" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      币种：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder name="currency">
                        <Select
                          className="next-form-text-align"
                          style={{ width: '100%' }}
                          dataSource={[
                            { label: '美元', value: 'usd' },
                            { label: '人民币', value: 'rmb' },
                          ]}
                        />
                      </IceFormBinder>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={styles.btns}>
                <Col xxs="8" s="2" l="2" style={styles.formLabel}>
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
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '30px',
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
