import React, { Component } from 'react';
import { Table, Pagination, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TableFilter from './TableFilter';

const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
    return {
      pageName: `Page${index}`,
      eventName: '点击事件',
      eventId: `1000${index}`,
      num: `986262${index}`,
      date: '2018-08-28',
      type: '遗漏埋点',
    };
  });
};

export default class TrackTable extends Component {
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
        this.fetchData();
      }
    );
  };

  handleFormChange = () => {
    this.fetchData(5);
  };

  handleApply = () => {
    Message.success('申请权限已发送，请十分钟之后再试');
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
      <IceContainer style={styles.container}>
        <h4 style={styles.title}>新增或遗漏埋点</h4>
        <TableFilter onChange={this.handleFormChange} />
        <Table
          dataSource={data}
          loading={isLoading}
          hasBorder={false}
          style={{ padding: '0 20px 20px' }}
        >
          <Table.Column title="页面名称" dataIndex="pageName" />
          <Table.Column title="事件名称" dataIndex="eventName" />
          <Table.Column title="事件 ID" dataIndex="eventId" />
          <Table.Column title="日期" dataIndex="date" />
          <Table.Column title="个数" dataIndex="num" />
          <Table.Column title="类型" dataIndex="type" />
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
    margin: '0 20px',
    padding: '0 0 20px',
  },
  title: {
    margin: '0',
    padding: '15px 20px',
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
  pagination: {
    textAlign: 'right',
  },
};
