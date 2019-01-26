import React, { Component } from 'react';
import { Checkbox, Table, Pagination } from '@alifd/next';

const { Group: CheckboxGroup } = Checkbox;

const getData = () => {
  return Array.from({ length: 10 }).map(() => {
    return {
      schemeName: '手淘商品详情',
      time: '2018-08-28 11:49:38',
      leader: '淘小宝',
      stat: {
        success: '289',
        error: '23',
        uncover: '136',
      },
    };
  });
};

const checkboxOptions = [
  {
    value: 'success',
    label: '成功',
  },
  {
    value: 'error',
    label: '错误',
  },
  {
    value: 'uncover',
    label: '未覆盖',
  },
];

export default class TableFilter extends Component {
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
        this.fetchData(10);
      }
    );
  };

  onChange = () => {
    this.fetchData(5);
  };

  renderOper = () => {
    return <a style={styles.link}>详情</a>;
  };

  renderStat = (value) => {
    return (
      <div>
        <span style={{ ...styles.stat, ...styles.successColor }}>
          {value.success}
        </span>
        <span style={{ ...styles.stat, ...styles.errorColor }}>
          {value.error}
        </span>
        <span style={{ ...styles.stat, ...styles.uncoverColor }}>
          {value.uncover}
        </span>
      </div>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.tableHead}>
          <div style={styles.label}>状态:</div>
          <CheckboxGroup
            style={{ marginLeft: '10px' }}
            defaultValue={['success', 'error']}
            dataSource={checkboxOptions}
            onChange={this.onChange}
          />
        </div>
        <Table loading={isLoading} dataSource={data} hasBorder={false}>
          <Table.Column title="方案名称" dataIndex="schemeName" />
          <Table.Column title="创建时间" dataIndex="time" />
          <Table.Column title="负责人" dataIndex="leader" />
          <Table.Column
            title="监控统计"
            dataIndex="stat"
            cell={this.renderStat}
          />
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
    margin: '10px 0',
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
  stat: {
    padding: '4px 8px',
    color: '#fff',
    fontSize: '12px',
  },
  successColor: {
    background: '#00a854',
  },
  errorColor: {
    background: '#f04134',
  },
  uncoverColor: {
    background: '#ffbf00',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
