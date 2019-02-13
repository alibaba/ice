import React, { Component } from 'react';
import { Table } from '@alifd/next';

export default class PublishTable extends Component {
  renderTime = (value) => {
    return (
      <div>
        <span>{value}</span>
        <span style={styles.tag}>运行中</span>
      </div>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <Table hasBorder={false} dataSource={data}>
        <Table.Column title="发布时间" dataIndex="time" cell={this.renderTime} />
        <Table.Column title="版本说明" dataIndex="desc" />
      </Table>
    );
  }
}

const styles = {
  tag: {
    marginLeft: '8px',
    color: '#52c41a',
    background: '#f6ffed',
    borderColor: '#b7eb8f',
    lineHeight: '20px',
    height: '22px',
    padding: '0 8px',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    fontSize: '12px',
    display: 'inline-block',
  },
};
