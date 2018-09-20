import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import TableFilter from './TableFilter';

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      id: `2018090${index}`,
      key: `200920${index}`,
      name: `iotApp0${index}`,
      platform: 'ANDROID',
      status: '正常',
    };
  });
};

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

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

  renderOper = () => {
    return (
      <div>
        <a style={styles.link}>详情</a>
        <span style={styles.separator} />
        <a style={styles.link}>申请权限</a>
      </div>
    );
  };

  render() {
    const dataSource = getData();
    const { current } = this.state;

    return (
      <div>
        <TableFilter />
        <Table dataSource={dataSource} hasBorder={false}>
          <Table.Column title="APPID" dataIndex="id" />
          <Table.Column title="当前APPKey" dataIndex="key" />
          <Table.Column title="应用名称" dataIndex="name" />
          <Table.Column title="应用平台" dataIndex="platform" />
          <Table.Column title="应用状态" dataIndex="status" />
          <Table.Column title="操作" cell={this.renderOper} />
        </Table>
        <Pagination
          style={styles.pagination}
          current={current}
          onChange={this.handlePaginationChange}
        />
      </div>
    );
  }
}

const styles = {
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
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
