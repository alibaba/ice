import React, { Component } from 'react';
import { Button, Input, Select } from '@alifd/next';

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.tableFilter}>
        <div style={styles.title}>权限管理</div>
        <div style={styles.filter}>
          <div style={styles.filterItem}>
            <span style={styles.filterLabel}>名称：</span>
            <Input />
          </div>
          <div style={styles.filterItem}>
            <span style={styles.filterLabel}>角色：</span>
            <Select style={{ width: '200px' }}>
              <Select.Option value="all">全部</Select.Option>
              <Select.Option value="admin">管理员</Select.Option>
              <Select.Option value="dbo">运营</Select.Option>
            </Select>
          </div>
          <div style={styles.filterItem}>
            <span style={styles.filterLabel}>状态：</span>
            <Select style={{ width: '200px' }}>
              <Select.Option value="all">全部</Select.Option>
              <Select.Option value="checked">已审核</Select.Option>
              <Select.Option value="unCheck">未审核</Select.Option>
            </Select>
          </div>
          <Button type="primary" style={styles.submitButton}>
            查询
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  tableFilter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    marginBottom: '20px',
    background: '#fff',
  },
  title: {
    height: '20px',
    lineHeight: '20px',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    paddingLeft: '12px',
    borderLeft: '4px solid #666',
  },
  filter: {
    display: 'flex',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  filterLabel: {
    fontWeight: '500',
    color: '#999',
  },
  submitButton: {
    marginLeft: '20px',
  },
};
