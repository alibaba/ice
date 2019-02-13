import React, { Component } from 'react';
import { Table, Pagination, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TableHead from './TableHead';

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
    return {
      id: `2${index}721${index}`,
      by: '淘小宝',
      to: '淘二宝',
      email: 'admin@gmail.com',
      subject: '项目评估',
      state: '未解决',
      date: `2018-08-1${index}`,
    };
  });
};

export default class TaskTable extends Component {
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

  handlePublish = () => {
    Dialog.confirm({
      content: '暂不支持编辑',
    });
  };

  handleDelete = () => {
    Dialog.confirm({
      content: '确认删除该任务吗',
      onOk: () => {
        this.fetchData();
      },
    });
  };

  renderOper = () => {
    return (
      <div>
        <a
          onClick={this.handlePublish}
          style={{ ...styles.btn, ...styles.editBtn }}
        >
          编辑
        </a>
        <a
          onClick={this.handleDelete}
          style={{ ...styles.btn, ...styles.deleteBtn }}
        >
          删除
        </a>
      </div>
    );
  };

  renderState = (value) => {
    return (
      <span style={styles.state}>
        <i style={styles.dot} />
        {value}
      </span>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <IceContainer style={styles.container}>
        <h3 style={styles.title}>任务列表</h3>
        <TableHead onChange={this.handleFilterChange} />
        <Table
          loading={isLoading}
          dataSource={data}
          hasBorder={false}
          style={styles.table}
        >
          <Table.Column title="编号" dataIndex="id" />
          <Table.Column title="Assign By" dataIndex="by" />
          <Table.Column title="Assign To" dataIndex="to" />
          <Table.Column title="邮箱" dataIndex="email" />
          <Table.Column title="标题" dataIndex="subject" />
          <Table.Column title="日期" dataIndex="date" />
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
  editBtn: {
    background: '#447eff',
    marginRight: '8px',
  },
  deleteBtn: {
    background: '#ee706d',
  },
  state: {
    color: '#ee706d',
    fontWeight: 'bold',
    position: 'relative',
  },
  dot: {
    width: '8px',
    height: '8px',
    background: '#ee706d',
    borderRadius: '50%',
    position: 'absolute',
    top: '4px',
    left: '-12px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'right',
  },
};
