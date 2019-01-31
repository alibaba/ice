/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

export default class TableHead extends Component {
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
              <span style={styles.formLabel}>部门：</span>
              <IceFormBinder name="type" triggerType="onBlur">
                <Select style={{ width: '200px' }}>
                  <Select.Option value="taobao">淘宝</Select.Option>
                  <Select.Option value="dingding">钉钉</Select.Option>
                  <Select.Option value="aliyun">阿里云</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="type" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>负责人：</span>
              <IceFormBinder name="leader" triggerType="onBlur">
                <Input placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="leader" />
              </div>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>预算：</span>
              <IceFormBinder name="budget" triggerType="onBlur">
                <Input placeholder="请输入" />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="budget" />
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
