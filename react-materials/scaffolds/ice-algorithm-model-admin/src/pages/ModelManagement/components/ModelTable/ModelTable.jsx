import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import TableHead from './TableHead';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      modelName: '强化学习',
      version: `0.0.${index + 1}`,
      updateTime: '2018-08-20',
      createTime: '2018-08-18',
      creator: '淘小宝',
      state: '待上线',
    };
  });
};

export default class ModelTable extends Component {
  static displayName = 'ModelTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };

  onChange = (selectedItems) => {
    console.log('onChange callback', selectedItems);
  };

  renderOper = () => {
    return (
      <div>
        <a style={{ ...styles.btn, ...styles.detailBtn }}>详情</a>
        <a style={{ ...styles.btn, ...styles.publishBtn }}>发布</a>
        <a style={{ ...styles.btn, ...styles.deleteBtn }}>删除</a>
      </div>
    );
  };

  renderState = (value) => {
    return <span style={styles.state}>{value}</span>;
  };

  render() {
    const dataSource = getData();
    const { current } = this.state;

    return (
      <IceContainer style={styles.container}>
        <h3 style={styles.title}>模型列表</h3>
        <TableHead />
        <Table dataSource={dataSource} hasBorder={false} style={styles.table}>
          <Table.Column title="模型服务" dataIndex="modelName" />
          <Table.Column title="最新版本" dataIndex="version" />
          <Table.Column title="更新时间" dataIndex="updateTime" />
          <Table.Column title="创建时间" dataIndex="createTime" />
          <Table.Column title="创建人" dataIndex="creator" />
          <Table.Column
            title="状态"
            dataIndex="state"
            cell={this.renderState}
          />
          <Table.Column title="操作" cell={this.renderOper} />
        </Table>
        <Pagination
          style={styles.pagination}
          current={current}
          onChange={this.handlePaginationChange}
        />
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  table: {
    padding: '20px',
  },
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
    borderBottom: '1px solid #f0f0f0',
  },
  btn: {
    display: 'inline-block',
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '4px',
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  detailBtn: {
    background: '#41cac0',
    marginRight: '8px',
  },
  publishBtn: {
    background: '#58c9f3',
    marginRight: '8px',
  },
  deleteBtn: {
    background: '#bec3c7',
  },
  state: {
    padding: '6px 12px',
    background: '#59ace2',
    color: '#fff',
    borderRadius: '4px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'right',
  },
};
