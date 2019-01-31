/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import styles from './index.module.scss';

const Toast = Message;

const data = [
  {
    id: 1,
    title: 'ice-contract-management-admin',
    url: 'https://github.com/alibaba/ice',
    type: '核心应用',
    publishTime: '17-04-28 20:29:20',
    publishStatus: '已上线',
    owner: '淘小宝',
    operation: {
      edit: false,
    },
  },
  {
    id: 2,
    title: 'ice-reviews-management',
    url: 'https://github.com/alibaba/ice',
    type: '非核心应用',
    publishTime: '17-04-28 20:29:20',
    publishStatus: '已上线',
    owner: '淘小宝',
    operation: {
      edit: true,
    },
  },
  {
    id: 3,
    title: 'ice-design-ecommerce',
    url: 'https://github.com/alibaba/ice',
    type: '非核心应用',
    publishTime: '17-04-28 20:29:20',
    publishStatus: '已上线',
    owner: '淘小宝',
    operation: {
      edit: false,
    },
  },
  {
    id: 4,
    title: 'ice-usertrack-admin',
    url: 'https://github.com/alibaba/ice',
    type: '非核心应用',
    publishTime: '17-04-28 20:29:20',
    publishStatus: '已发布',
    owner: '淘小宝',
    operation: {
      edit: true,
    },
  },
  {
    id: 5,
    title: 'ice-scaffold-cms',
    url: 'https://github.com/alibaba/ice',
    type: '非核心应用',
    publishTime: '17-04-28 20:29:20',
    publishStatus: '已上线',
    owner: '淘小宝',
    operation: {
      edit: true,
    },
  },
  {
    id: 6,
    title: 'ice-contract-management-admin',
    url: 'https://github.com/alibaba/ice',
    type: '非核心应用',
    publishTime: '17-04-28 20:29:20',
    publishStatus: '已上线',
    owner: '淘小宝',
    operation: {
      edit: true,
    },
  },
  {
    id: 7,
    title: 'ice-yunqi-homepage',
    url: 'https://github.com/alibaba/ice',
    type: '非核心应用',
    publishTime: '17-04-28 20:29:20',
    publishStatus: '已上线',
    owner: '淘小宝',
    operation: {
      edit: true,
    },
  },
  {
    id: 8,
    title: 'coreui-admin',
    url: 'https://github.com/alibaba/ice',
    type: '非核心应用',
    publishTime: '17-04-28 20:29:20',
    publishStatus: '已上线',
    owner: '淘小宝',
    operation: {
      edit: true,
    },
  },
];

export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 100,
      __loading: false,
      filterFormValue: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (query = {}) => {
    this.setState({
      __loading: true,
    });

    setTimeout(() => {
      // 此处是为了模拟数据变化
      if (query.app || query.status) {
        this.setState({
          list: data.slice(0, 3),
          currentPage: 1,
          __loading: false,
        });
      } else {
        this.setState({
          list: data,
          currentPage: query.page || 1,
          __loading: false,
        });
      }
    }, 300);
  };

  renderTitle = (value, index, record) => {
    return (
      <div className={styles.titleWrapper}>
        <a href="#/detail">
          <span className={styles.title}>{record.title}</span>
        </a>
      </div>
    );
  };

  publish = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
    Toast.success(`${record.title} 发布成功`);
  };

  offline = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
    Toast.error(`${record.title} 下线失败`);
  };

  renderOperations = (value, index, record) => {
    if (!record.operation.edit) {
      return (
        <div className="filter-table-operation">
          <a href="#/account" className={styles.operationItem}>
            申请权限
          </a>
        </div>
      );
    }

    return (
      <div className="filter-table-operation">
        <a
          href="#"
          className={styles.operationItem}
          target="_blank"
          onClick={(e) => this.publish(record, e)}
        >
          发布
        </a>
        <a
          href="#"
          className={styles.operationItem}
          target="_blank"
          onClick={(e) => this.offline(record, e)}
        >
          下线
        </a>
      </div>
    );
  };

  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTable = () => {
    this.fetchData(this.state.filterFormValue);
  };

  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };

  render() {
    const {
      list,
      currentPage,
      pageSize,
      total,
      filterFormValue,
      __loading,
    } = this.state;

    return (
      <div className="filter-table">
        <IceContainer title="应用查询">
          <FilterForm
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTable}
            onReset={this.resetFilter}
          />
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={list}
            loading={__loading}
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column title="ID" dataIndex="id" width={30} />
            <Table.Column title="应用名" cell={this.renderTitle} width={150} />
            <Table.Column title="等级" dataIndex="type" width={100} />
            <Table.Column title="Owner" dataIndex="owner" width={100} />
            <Table.Column
              title="状态"
              dataIndex="publishStatus"
              width={85}
              cell={this.renderStatus}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
              cell={this.renderOperations}
            />
          </Table>
          <div className={styles.paginationWrapper}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}
