/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Progress } from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';

const data = [
  {
    id: 2135345,
    app: 'contract-management',
    type: 'publish',
    env: 'pub',
    statue: 'success',
    progress: 29,
    errorRate: 0,
    publisher: '淘小宝',
    publishTime: '17-07-03 09:17:08',
  },
  {
    id: 2135346,
    app: 'contract-management',
    type: 'publish',
    env: 'pre',
    statue: 'success',
    progress: 80,
    errorRate: 0,
    publisher: '淘小宝',
    publishTime: '17-04-28 20:29:20',
  },
  {
    id: 2135344,
    app: 'contract-management',
    type: 'publish',
    env: 'pre',
    statue: 'error',
    progress: 53,
    errorRate: 100,
    publisher: '淘小宝',
    publishTime: '17-05-02 12:19:20',
  },
  {
    id: 2135349,
    app: 'contract-management',
    type: 'publish',
    env: 'pub',
    statue: 'success',
    progress: 88,
    errorRate: 0,
    publisher: '淘小宝',
    publishTime: '17-04-29 23:29:20',
  },
  {
    id: 2134040,
    app: 'contract-management',
    type: 'publish',
    env: 'pre',
    statue: 'success',
    progress: 100,
    errorRate: 0,
    publisher: '淘小宝',
    publishTime: '17-04-28 20:29:20',
  }, {
    id: 2133343,
    app: 'contract-management',
    type: 'publish',
    env: 'pub',
    statue: 'success',
    progress: 100,
    errorRate: 0,
    publisher: '淘小宝',
    publishTime: '16-04-28 20:29:20',
  },
  {
    id: 2125344,
    app: 'contract-management',
    type: 'publish',
    env: 'pre',
    statue: 'error',
    progress: 0,
    errorRate: 55,
    publisher: '淘小宝',
    publishTime: '17-05-02 12:19:20',
  },
  {
    id: 2138349,
    app: 'contract-management',
    type: 'publish',
    env: 'pub',
    statue: 'success',
    progress: 55,
    errorRate: 0,
    publisher: '淘小宝',
    publishTime: '17-04-29 23:29:20',
  },
  {
    id: 2195340,
    app: 'contract-management',
    type: 'publish',
    env: 'pre',
    statue: 'success',
    progress: 100,
    errorRate: 0,
    publisher: '淘小宝',
    publishTime: '17-04-28 20:29:20',
  }, {
    id: 2145343,
    app: 'contract-management',
    type: 'publish',
    env: 'pub',
    statue: 'success',
    progress: 100,
    errorRate: 0,
    publisher: '淘小宝',
    publishTime: '16-04-28 20:29:20',
  },
];
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

    setTimeout(() => {
      this.setState({
        list: data,
        currentPage: query.page || 1,
        __loading: false,
      });
    }, 300);
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
      <Progress progressive percent={value} size="large" />
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
          loading={__loading}
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
