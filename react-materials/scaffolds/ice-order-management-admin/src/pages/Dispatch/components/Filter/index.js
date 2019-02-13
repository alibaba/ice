/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { DatePicker, Input, Grid } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;

export default class Filter extends Component {
  state = {
    value: {},
  };

  formChange = (value) => {
    this.props.onChange(value);
  };

  buttonChange = () => {
    this.props.onChange();
  };

  render() {
    return (
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row>
          <Col style={styles.formItem}>
            <span style={styles.formLabel}>发货时间：</span>
            <IceFormBinder triggerType="onBlur" name="dispatchTime">
              <RangePicker placeholder="请输入" style={{ width: '240px' }} />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="dispatchTime" />
            </div>
          </Col>
          <Col style={styles.formItem}>
            <span style={styles.formLabel}>下单时间：</span>
            <IceFormBinder triggerType="onBlur" name="orderTime">
              <RangePicker placeholder="请输入" style={{ width: '240px' }} />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="orderTime" />
            </div>
          </Col>
          <Col style={styles.formItem}>
            <span style={styles.formLabel}>商品名称：</span>
            <IceFormBinder triggerType="onBlur" name="productName">
              <Input placeholder="请输入" style={{ width: '240px' }} />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="productName" />
            </div>
          </Col>
        </Row>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '80px',
  },
};
