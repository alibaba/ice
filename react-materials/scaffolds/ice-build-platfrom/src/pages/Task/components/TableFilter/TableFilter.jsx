import React, { Component } from 'react';
import { Button, Select, Input } from '@icedesign/base';

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.tableFilter}>
        <div style={styles.filterItem}>
          <span style={styles.filterLabel}>仓库：</span>
          <Input placeholder="请输入仓库名" size="large" />
        </div>
        <div style={styles.filterItem}>
          <span style={styles.filterLabel}>构建器：</span>
          <Input placeholder="请输入构建器名" size="large" />
        </div>
        <div style={styles.filterItem}>
          <span style={styles.filterLabel}>用户：</span>
          <Input placeholder="请输入用户名" size="large" />
        </div>
        <div style={styles.filterItem}>
          <span style={styles.filterLabel}>Client：</span>
          <Select size="large">
            <Select.Option value="travis">Travis CI</Select.Option>
            <Select.Option value="jenkins">Jenkins</Select.Option>
          </Select>
        </div>
        <div style={styles.filterItem}>
          <span style={styles.filterLabel}>状态：</span>
          <Select size="large">
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="success">成功</Select.Option>
            <Select.Option value="failed">失败</Select.Option>
          </Select>
        </div>
        <Button type="primary" size="large" style={styles.submitButton}>
          查询
        </Button>
      </div>
    );
  }
}

const styles = {
  tableFilter: {
    display: 'flex',
    background: '#f4f4f4',
    padding: '15px 0',
    marginBottom: '20px',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '15px',
  },
  submitButton: {
    marginLeft: '15px',
  },
};
