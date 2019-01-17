import React, { Component } from 'react';
import { Table, Pagination, Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import TableHead from './TableHead';

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
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
      content: '确认发布线上吗',
      onOk: () => {
        this.fetchData();
      },
    });
  };

  handleDelete = () => {
    Dialog.confirm({
      content: '确认删除该模型吗',
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
          style={{ ...styles.btn, ...styles.publishBtn }}
        >
          发布
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
        <h3 style={styles.title}>模型列表</h3>
        <TableHead onChange={this.handleFilterChange} />
        <Table
          isLoading={isLoading}
          dataSource={data}
          hasBorder={false}
          style={styles.table}
        >
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
  publishBtn: {
    background: '#5e83fb',
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
