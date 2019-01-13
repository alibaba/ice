import React, { Component } from 'react';
import { Table, Pagination, Dialog } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import TableHead from './TableHead';

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
    return {
      department: '淘宝',
      name: '淘小宝',
      yearBudget: `678,89${index}`,
      appendBudget: `${index + 1}23,456`,
      distributionRate: `88.8${index}%`,
      uesed: `123,45${index}`,
      usagRate: `99.0${index}%`,
    };
  });
};

@withRouter
export default class Calculate extends Component {
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

  handleEdit = () => {
    Dialog.confirm({
      title: '提示',
      content: '只有管理员才能进行修改',
    });
  };

  handleDetail = () => {
    this.props.history.push('/manage/department');
  };

  renderOper = () => {
    return (
      <div>
        <a style={styles.link} onClick={this.handleEdit}>
          修改
        </a>
        <span style={styles.separator} />
        <a style={styles.link} onClick={this.handleDetail}>
          详情
        </a>
      </div>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div style={styles.container}>
        <TableHead onChange={this.handleFilterChange} />
        <Table loading={isLoading} dataSource={data} hasBorder={false}>
          <Table.Column title="部门名称" dataIndex="department" />
          <Table.Column title="接口人" dataIndex="name" />
          <Table.Column width={150} title="财年预算(万元)" dataIndex="yearBudget" />
          <Table.Column width={150} title="追加预算(万元)" dataIndex="appendBudget" />
          <Table.Column title="分配率(%)" dataIndex="distributionRate" />
          <Table.Column title="已使用(KCU)" dataIndex="uesed" />
          <Table.Column title="使用率(%)" dataIndex="usagRate" />
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
  container: {
    padding: '0 20px 20px',
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
