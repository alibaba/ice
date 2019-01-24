import React, { Component } from 'react';
import { Table, Pagination, Dialog, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TableHead from './TableHead';
import styles from './table.module.scss';

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
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handlePublish}
        >
          发布
        </Button>
        <Button type="primary" warning onClick={this.handleDelete}>
          删除
        </Button>
      </div>
    );
  };

  renderState = (value) => {
    return (
      <span className={styles.state}>
        <i className={styles.dot} />
        {value}
      </span>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <IceContainer className={styles.container}>
        <h3 className={styles.title}>模型列表</h3>
        <TableHead onChange={this.handleFilterChange} />
        <Table
          loading={isLoading}
          dataSource={data}
          hasBorder={false}
          className={styles.table}
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
          className={styles.pagination}
          current={current}
          onChange={this.handlePaginationChange}
        />
      </IceContainer>
    );
  }
}
