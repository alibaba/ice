import React, { Component } from 'react';
import { Input, Table } from '@icedesign/base';

export default class EntitlesTable extends Component {
  static displayName = 'EntitlesTable';

  render() {
    return (
      <div>
        <div style={styles.searchBar}>
          <div style={styles.info}>本主题包含 0 个实体</div>
          <Input
            size="large"
            style={{ width: '300px' }}
            placeholder="请输入实体名称"
          />
        </div>
        <Table hasBorder={false}>
          <Table.Column title="实体名称" dataIndex="name" />
          <Table.Column title="描述" dataIndex="desc" />
          <Table.Column title="预览" dataIndex="preview" />
          <Table.Column title="关联技能" dataIndex="skill" />
          <Table.Column title="操作" />
        </Table>
      </div>
    );
  }
}

const styles = {
  searchBar: {
    fontSize: '20px',
    fontWeight: '400',
    color: '#333333',
    height: '32px',
    lineHeight: '32px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    color: '#1890ff',
    fontSize: '14px',
  },
  info: {
    flex: '1',
    fontWeight: '400',
  },
};
