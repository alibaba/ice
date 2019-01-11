/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Input, Button } from '@alifd/next';
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

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      this.props.onChange(values);
    });
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.title}>快照过滤</h4>
        <IceFormBinderWrapper value={this.state.value} ref="form">
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="7">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>验证方案：</span>
                <IceFormBinder name="scheme" triggerType="onBlur">
                  <Input
                    placeholder="请输入验证方案"
                  />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="scheme" />
                </div>
              </div>
            </Col>
            <Col l="7">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>APP 版本：</span>
                <IceFormBinder name="version" triggerType="onBlur">
                  <Input placeholder="请输入版本" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="version" />
                </div>
              </div>
            </Col>
            <Col l="7">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>创建人：</span>
                <IceFormBinder name="creator" triggerType="onBlur">
                  <Input
                    placeholder="请输入创建人"
                  />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="creator" />
                </div>
              </div>
            </Col>
            <Col l="3" xxs="24">
              <div style={styles.formItem}>
                <Button
                  type="primary"
                  onClick={this.validateAllFormField}
                >
                  搜 索
                </Button>
              </div>
            </Col>
          </Row>
        </IceFormBinderWrapper>
      </IceContainer>
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
    margin: '10px 0',
  },
};
