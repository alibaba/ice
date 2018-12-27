import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from '../../../../components/CustomTable';
import TableFilter from '../TableFilter';

const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
    return {
      id: index + 1,
      time: `${index + 1} 分钟前`,
      repo: 'alibaba/ice',
      username: '淘小宝',
      client: 'travis-ci',
      builder: '@ice/ice-scripts',
      builderTime: `1${index}s`,
      state: '成功',
    };
  });
};

export default class TaskTable extends Component {
  state = {
    isLoading: false,
    data: [],
  };

  componentDidMount() {
    this.fetchData(10);
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

  handleSubmit = () => {
    this.fetchData(5);
  };

  renderState = (value) => {
    return (
      <div style={styles.state}>
        <span style={styles.stateText}>{value}</span>
      </div>
    );
  };

  renderOper = () => {
    return (
      <div style={styles.oper}>
        <a href="/">查看</a>
      </div>
    );
  };

  columnsConfig = () => {
    return [
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '仓库',
        dataIndex: 'repo',
        key: 'repo',
      },
      {
        title: '用户',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
      },
      {
        title: '构建器',
        dataIndex: 'builder',
        key: 'builder',
      },
      {
        title: '构建时长',
        dataIndex: 'builderTime',
        key: 'builderTime',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        cell: this.renderState,
      },
      {
        title: '详情',
        dataIndex: 'detail',
        key: 'detail',
        cell: this.renderOper,
      },
    ];
  };

  render() {
    const { data, isLoading } = this.state;

    return (
      <IceContainer>
        <div style={styles.tableHead}>
          <div style={styles.tableTitle}>构建任务</div>
        </div>
        <TableFilter handleSubmit={this.handleSubmit} />
        <CustomTable
          columns={this.columnsConfig()}
          dataSource={data}
          isLoading={isLoading}
          onChange={this.fetchData}
        />
      </IceContainer>
    );
  }
}

const styles = {
  tableHead: {
    height: '32px',
    lineHeight: '32px',
    margin: '0 0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableTitle: {
    height: '20px',
    lineHeight: '20px',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    paddingLeft: '12px',
    borderLeft: '4px solid #666',
  },
  stateText: {
    display: 'inline-block',
    padding: '5px 10px',
    color: '#52c41a',
    background: '#f6ffed',
    border: '1px solid #b7eb8f',
    borderRadius: '4px',
  },
};
