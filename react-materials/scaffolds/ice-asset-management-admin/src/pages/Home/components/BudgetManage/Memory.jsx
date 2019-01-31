import React, { Component } from 'react';
import { Table, Pagination, Dialog } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import TableHead from './TableHead';

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
    return {
      department: '阿里云',
      name: '淘小宝',
      yearBudget: `12,34${index}`,
      appendBudget: '0',
      distribution: `91,12${index}`,
      distributionRate: `66.1${index}%`,
      uesed: `5,67${index}`,
      usagRate: `33.0${index}`,
    };
  });
};

@withRouter
export default class Memory extends Component {
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
          <Table.Column title="部门名称" dataIndex="department" width={100} />
          <Table.Column title="接口人" dataIndex="name" width={150} />
          <Table.Column
            title="财年预算(万元)"
            dataIndex="yearBudget"
            width={150}
          />
          <Table.Column
            title="追加预算(万元)"
            dataIndex="appendBudget"
            width={150}
          />
          <Table.Column title="已分配" dataIndex="distribution" width={100} />
          <Table.Column
            title="分配率(%)"
            dataIndex="distributionRate"
            width={100}
          />
          <Table.Column title="已使用(KCU)" dataIndex="uesed" width={100} />
          <Table.Column title="使用率(%)" dataIndex="usagRate" width={100} />
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
    padding: '0 20px 20px',
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
