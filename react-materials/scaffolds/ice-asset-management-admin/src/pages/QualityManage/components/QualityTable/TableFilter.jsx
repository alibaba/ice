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
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>平均分：</span>
              <IceFormBinder triggerType="onBlur" name="average">
                <Input placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="average" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>标准分：</span>
              <IceFormBinder triggerType="onBlur" name="standard">
                <Input placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="standard" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>所有表个数：</span>
              <IceFormBinder triggerType="onBlur" name="alltable">
                <Input placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="alltable" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>等级：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select style={{ width: '200px' }}>
                  <Select.Option value="a1">A1</Select.Option>
                  <Select.Option value="a2">A2</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>监控率：</span>
              <IceFormBinder triggerType="onBlur" name="rate">
                <Input placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="rate" />
              </div>
            </div>
          </Col>
        </Row>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  title: {
    margin: '0',
    padding: '20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee',
  },
  formRow: {
    padding: '10px 20px',
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '70px',
  },
};
