/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import axios from 'axios';
import FilterForm from './Filter';

const Toast = Feedback.toast;

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
      __loading: true
    });

    // Make a request for a user with a given ID
    axios.get('/mock/filter-table-list.json')
      .then((response) => {
        const list  = response.data.data.list;

        // 此处是为了模拟数据变化
        if (query.app || query.status) {
          this.setState({
            list: list.slice(0, 3),
            currentPage: 1
          });
        } else {
          this.setState({
            list: list,
            currentPage: query.page || 1
          });
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        this.setState({
          __loading: false
        });
      });
  };

  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <a href="#/detail">
          <span style={styles.title}>{record.title}</span>
        </a>
      </div>
    );
  };

  publish = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
    Toast.success(record.title + " 发布成功")
  };

  offline = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
    Toast.error(record.title + " 下线失败")
  };

  renderOperations = (value, index, record) => {
    if (!record.operation.edit) {
      return (
        <div
          className="filter-table-operation"
          style={styles.filterTableOperation}
        >
          <a
            href="#/account"
            style={styles.operationItem}
            >
            申请权限
          </a>
        </div>
      );
    }

    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <a
          href="#"
          style={styles.operationItem}
          target="_blank"
          onClick={this.publish.bind(this, record)}
          >
            发布
        </a>
        <a
          href="#"
          style={styles.operationItem}
          target="_blank"
          onClick={this.offline.bind(this, record)}
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
      page: currentPage
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
      __loading
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
            isLoading={__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="ID" dataIndex="id" width={30} />
            <Table.Column
              title="应用名"
              cell={this.renderTitle}
              width={150}
            />
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
          <div style={styles.paginationWrapper}>
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

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
