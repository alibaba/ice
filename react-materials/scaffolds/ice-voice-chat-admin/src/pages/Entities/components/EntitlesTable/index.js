import React, { Component } from 'react';
import { Input, Table, Dialog } from '@alifd/next';

export default class EntitlesTable extends Component {
  handleEdit = () => {
    Dialog.confirm({
      title: '提示',
      content: '只有管理员权限才能编辑',
    });
  };

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '只有管理员权限才能删除',
    });
  };

  renderOper = () => {
    return (
      <div style={styles.oper}>
        <a style={styles.button} onClick={this.handleEdit}>
          编辑
        </a>
        <a style={styles.button} onClick={this.handleDelete}>
          删除
        </a>
      </div>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div style={styles.searchBar}>
          <div style={styles.info}>本主题包含 {data.length} 个实体</div>
          <Input
            style={{ width: '300px' }}
            placeholder="请输入实体名称"
          />
        </div>
        <Table hasBorder={false} dataSource={data}>
          <Table.Column title="索引" dataIndex="id" />
          <Table.Column title="实体名称" dataIndex="name" />
          <Table.Column title="描述" dataIndex="desc" />
          <Table.Column title="预览" dataIndex="preview" />
          <Table.Column title="关联技能" dataIndex="skill" />
          <Table.Column title="操作" cell={this.renderOper} />
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
  button: {
    cursor: 'pointer',
    color: '#1890ff',
    marginRight: '5px',
  },
};
