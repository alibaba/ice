import React, { Component } from 'react';
import { Input, Table, Pagination } from '@alifd/next';

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      pageName: `Page${index}`,
      eventName: '点击事件',
      eventId: `1000${index}`,
      schemeName: '手淘商品详情',
      successNum: `1023${index}`,
      failedNum: 0,
      leader: '淘小宝',
    };
  });
};

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

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

  onChange = (value) => {
    console.log({ value });
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
      <div style={styles.container}>
        <div style={styles.tableHead}>
          <div style={styles.label}>页面名称:</div>
          <Input
            placeholder="请输入页面名称"
            hasClear
            onChange={this.onChange}
            size="large"
            style={{ width: '220px' }}
          />
        </div>
        <Table dataSource={dataSource} hasBorder={false}>
          <Table.Column title="页面名称" dataIndex="pageName" width={100} />
          <Table.Column title="事件名称" dataIndex="eventName" width={150} />
          <Table.Column title="事件ID" dataIndex="eventId" width={100} />
          <Table.Column title="方案名称" dataIndex="schemeName" width={100} />
          <Table.Column title="成功数" dataIndex="successNum" width={100} />
          <Table.Column title="失败数" dataIndex="failedNum" width={100} />
          <Table.Column title="负责人" dataIndex="leader" width={100} />
          <Table.Column title="操作" cell={this.renderOper} width={200} />
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
  container: {
    margin: '10px 0',
  },
  tableHead: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
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
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
