/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Progress } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import axios from 'axios';

export default class PublishList extends Component {
  static displayName = 'PublishList';

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 100,
      __loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (query = {}) => {
    this.setState({
      __loading: true,
    });

    // Make a request for a user with a given ID
    axios.get('/mock/history-table.json')
      .then((response) => {
        const list = response.data.data.list;
        this.setState({
          list,
          currentPage: query.page || 1,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        this.setState({
          __loading: false,
        });
      });
  };

  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <a href="#/detail">
          <span style={styles.title}>{record.app}</span>
        </a>
      </div>
    );
  };

  renderType = (value) => {
    return value === 'publish' ? '发布' : '未知';
  }

  renderEnv = (value) => {
    return value === 'pre' ? '预发' : '正式';
  }

  renderStatus = (value) => {
    if (value === 'success') {
      return (
        <IceLabel inverse={false} status="success">
          成功
        </IceLabel>
      );
    }

    return (
      <IceLabel inverse={false} status="danger">
        失败
      </IceLabel>
    );
  };

  renderProgress = (value) => {
    return (
      <Progress percent={value} size="large" />
    );
  }

  renderErrorRate = (value) => {
    return (
      <span style={value ? { color: '#FA7070' } : {}}>{`${value}%`}</span>
    );
  }

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };

  render() {
    const {
      list,
      currentPage,
      pageSize,
      total,
      __loading,
    } = this.state;

    return (
      <IceContainer title="我的发布单">
        <Table
          dataSource={list}
          isLoading={__loading}
          className="basic-table"
          style={styles.basicTable}
          hasBorder={false}
          isZebra
        >
          <Table.Column title="发布单ID" dataIndex="id" width={60} />
          <Table.Column
            title="应用名"
            cell={this.renderTitle}
            width={120}
          />
          <Table.Column
            title="类型"
            dataIndex="type"
            cell={this.renderType}
            width={80}
          />
          <Table.Column
            title="发布环境"
            dataIndex="env"
            cell={this.renderEnv}
            width={80}
          />
          <Table.Column
            title="状态"
            dataIndex="statue"
            width={80}
            cell={this.renderStatus}
          />
          <Table.Column
            title="进度"
            dataIndex="progress"
            cell={this.renderProgress}
            width={120}
          />
          <Table.Column title="发布者" dataIndex="publisher" width={80} />
          <Table.Column
            title="失败机器占比"
            dataIndex="errorRate"
            cell={this.renderErrorRate}
            width={100}
          />
          <Table.Column title="发布时间" dataIndex="publishTime" width={120} />
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
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
