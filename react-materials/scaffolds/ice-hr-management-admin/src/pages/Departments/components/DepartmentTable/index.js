import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TableFilter from './Filter';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      index: random(10000, 100000),
      name: ['客户端部门', '前端部门', '设计部门', '运营部门', 'IOT 部门'][
        random(0, 4)
      ],
      lead: ['淘小宝', '淘二宝'][random(0, 1)],
      total: random(100, 200),
      createTime: `20${random(10, 20)}-0${random(1, 9)}-12`,
    };
  });
};

export default class DepartmentTable extends Component {
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
    const { isLoading, data, current } = this.state;

    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.title}>部门列表</h4>
        <TableFilter onChange={this.handleFilterChange} />
        <Table
          loading={isLoading}
          dataSource={data}
          hasBorder={false}
          style={{ padding: '0 20px 20px' }}
        >
          <Table.Column title="编号" dataIndex="index" />
          <Table.Column title="部门名称" dataIndex="name" />
          <Table.Column title="部门主管" dataIndex="lead" />
          <Table.Column title="部门人数" dataIndex="total" />
          <Table.Column title="成立时间" dataIndex="createTime" />
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
