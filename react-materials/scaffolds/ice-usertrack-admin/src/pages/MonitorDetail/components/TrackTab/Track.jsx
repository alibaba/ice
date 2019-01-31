import React, { Component } from 'react';
import { Input, Table, Pagination, Message } from '@alifd/next';

const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
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
  state = {
    current: 1,
    isLoading: false,
    data: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len));
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => {
          this.setState({
            data,
            isLoading: false,
          });
        });
      }
    );
  };

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData(10);
      }
    );
  };

  handleApply = () => {
    Message.success('申请权限已发送，请十分钟之后再试');
  };

  onChange = () => {
    this.fetchData(5);
  };

  renderOper = () => {
    return (
      <div>
        <a style={styles.link}>详情</a>
        <span style={styles.separator} />
        <a style={styles.link} onClick={this.handleApply}>
          申请权限
        </a>
      </div>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.tableHead}>
          <div style={styles.label}>页面名称:</div>
          <Input
            placeholder="请输入页面名称"
            hasClear
            onChange={this.onChange}
            style={{ width: '220px' }}
          />
        </div>
        <Table dataSource={data} loading={isLoading} hasBorder={false}>
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
    margin: '0 10px',
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
