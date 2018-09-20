import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@icedesign/base';

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      name: '新版手淘',
      appid: `2018${index}`,
      version: `0.0.${index}`,
      creator: '淘小宝',
      createTime: `2018-08-28 14:29:0${index}`,
      status: '正常',
    };
  });
};

export default class SnapshotTable extends Component {
  static displayName = 'SnapshotTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderOper = () => {
    return <a style={styles.link}>查看监控详情</a>;
  };

  render() {
    const dataSource = getData();
    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.title}>快照列表</h4>
        <Table dataSource={dataSource} hasBorder={false} style={styles.table}>
          <Table.Column title="名称" dataIndex="name" />
          <Table.Column title="APPId" dataIndex="appid" />
          <Table.Column title="版本" dataIndex="version" />
          <Table.Column title="创建人" dataIndex="creator" />
          <Table.Column title="创建时间" dataIndex="createTime" />
          <Table.Column title="状态" dataIndex="status" />
          <Table.Column title="操作" cell={this.renderOper} />
        </Table>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
    padding: '0',
  },
  table: {
    margin: '20px',
  },
  title: {
    margin: '0 0 20px',
    padding: '20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee',
  },
  link: {
    margin: '0 5px',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  separator: {
    margin: '0 8px',
    display: 'inline-block',
    height: '12px',
    width: '1px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
};
