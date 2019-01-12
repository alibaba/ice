import React, { Component } from 'react';
import { Input, Table } from '@alifd/next';

export default class GeneralizationTable extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <div style={styles.searchBar}>
          <div style={styles.info}>共计 {data.length} 条泛化规则</div>
          <Input

            style={{ width: '300px' }}
            placeholder="请输入泛化规则名称或者泛化词汇"
          />
        </div>
        <Table hasBorder={false} dataSource={data}>
          <Table.Column title="规则名称" dataIndex="name" />
          <Table.Column title="规则描述" dataIndex="desc" />
          <Table.Column title="泛化词汇" dataIndex="words" />
          <Table.Column title="关联技能" dataIndex="skill" />
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
