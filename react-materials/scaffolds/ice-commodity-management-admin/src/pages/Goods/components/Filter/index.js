/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select } from '@alifd/next';
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
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商品名称：</span>
              <IceFormBinder triggerType="onBlur" name="name">
                <Input placeholder="请输入" style={{ width: '200px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商品分类：</span>
              <IceFormBinder triggerType="onBlur" name="cate">
                <Select style={{ width: '200px' }}>
                  <Select.Option value="1">智能</Select.Option>
                  <Select.Option value="2">数码</Select.Option>
                  <Select.Option value="3">新品</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="cate" />
              </div>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>归属门店：</span>
              <IceFormBinder triggerType="onBlur" name="store">
                <Select style={{ width: '200px' }}>
                  <Select.Option value="1">余杭盒马店</Select.Option>
                  <Select.Option value="2">滨江盒马店</Select.Option>
                  <Select.Option value="3">西湖盒马店</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="store" />
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
    minWidth: '80px',
  },
};
