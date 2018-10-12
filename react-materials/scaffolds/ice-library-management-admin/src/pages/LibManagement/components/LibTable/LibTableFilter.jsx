/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;

export default class TableHead extends Component {
  static displayName = 'TableHead';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
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
              <span style={styles.formLabel}>图书名称：</span>
              <IceFormBinder triggerType="onBlur">
                <Input placeholder="请输入" name="bookName" size="large" />
              </IceFormBinder>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>作者名称：</span>
              <IceFormBinder triggerType="onBlur">
                <Input placeholder="请输入" name="authorName" size="large" />
              </IceFormBinder>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>ISBN 号：</span>
              <IceFormBinder triggerType="onBlur">
                <Input placeholder="请输入" name="bookName" size="large" />
              </IceFormBinder>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>图书分类：</span>
              <IceFormBinder triggerType="onBlur">
                <Select
                  placeholder="请选择"
                  multiple
                  name="cate"
                  size="large"
                  style={{ minWidth: '200px' }}
                >
                  <Option value="technology">技术领域</Option>
                  <Option value="professional">专业领域</Option>
                  <Option value="management">管理沟通</Option>
                  <Option value="other">其他</Option>
                </Select>
              </IceFormBinder>
            </div>
          </Col>
          <Col l="8">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>出版社：</span>
              <IceFormBinder triggerType="onBlur">
                <Input placeholder="请输入" name="publisher" size="large" />
              </IceFormBinder>
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
