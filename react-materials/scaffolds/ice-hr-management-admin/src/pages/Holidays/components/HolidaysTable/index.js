import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TableFilter from './Filter';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const state = [
  {
    color: '#999',
    text: '已批准',
  },
  {
    color: '#ee706d',
    text: '流程中',
  },
  {
    color: '#5e83fb',
    text: '已撤回',
  },
];

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
    return {
      id: index + 1,
      type: ['休年假', '事假', '调休'][random(0, 2)],
      startTime: `20${random(10, 20)}-0${random(1, 9)}-12`,
      endTime: `20${random(10, 20)}-0${random(1, 9)}-18`,
      days: random(1, 10),
      origin: ['本人提交', '电话申请'][random(0, 1)],
      state: state[random(0, 2)],
    };
  });
};

export default class HolidaysTable extends Component {
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

  handleFilterChange = () => {
    this.fetchData(5);
  };

  renderState = (value) => {
    return (
      <span
        style={{
          background: value.color,
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
        }}
      >
        {value.text}
      </span>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.title}>请假记录</h4>
        <TableFilter onChange={this.handleFilterChange} />
        <Table
          loading={isLoading}
          dataSource={data}
          hasBorder={false}
          style={{ padding: '0 20px 20px' }}
        >
          <Table.Column title="索引" dataIndex="id" />
          <Table.Column title="假期类型" dataIndex="type" />
          <Table.Column title="开始日期" dataIndex="startTime" />
          <Table.Column title="结束时间" dataIndex="endTime" />
          <Table.Column title="请假天数" dataIndex="days" />
          <Table.Column title="假期来源" dataIndex="origin" />
          <Table.Column
            title="状态"
            dataIndex="state"
            cell={this.renderState}
          />
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
  pagination: {
    textAlign: 'right',
  },
};
