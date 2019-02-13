/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

export default class Filter extends Component {
  state = {
    value: {},
  };

  formChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>时间筛选：</span>
              <IceFormBinder triggerType="onBlur" name="time">
                <DatePicker placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="time" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>时间区间：</span>
              <IceFormBinder triggerType="onBlur" name="timeInterval">
                <Select style={{ width: '200px' }}>
                  <Select.Option value="1">近3个月</Select.Option>
                  <Select.Option value="2">近半年</Select.Option>
                  <Select.Option value="3">近一年</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="timeInterval" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>状态：</span>
              <IceFormBinder triggerType="onBlur" name="state">
                <Select style={{ width: '200px' }}>
                  <Select.Option value="1">提现中</Select.Option>
                  <Select.Option value="2">提现完成</Select.Option>
                  <Select.Option value="3">提现失败</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
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
    minWidth: '70px',
  },
};
