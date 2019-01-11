/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, DatePicker } from '@alifd/next';
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
              <span style={styles.formLabel}>页面名称：</span>
              <IceFormBinder triggerType="onBlur" name="pageName">
                <Input placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="pageName" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>事件 ID：</span>
              <IceFormBinder triggerType="onBlur" name="eventId">
                <Input placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="eventId" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>事件名称：</span>
              <IceFormBinder triggerType="onBlur" name="eventName">
                <Input placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="eventName" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>类型：</span>
              <IceFormBinder triggerType="onBlur" name="type">
                <Select style={{ width: '200px' }}>
                  <Select.Option value="miss">遗漏埋点</Select.Option>
                  <Select.Option value="new">新增埋点</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>日期：</span>
              <IceFormBinder triggerType="onBlur" name="date">
                <DatePicker
                  style={{ width: '200px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="date" />
              </div>
            </div>
          </Col>
        </Row>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
    padding: '0',
  },
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
