import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Pagination } from '@icedesign/base';

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      testTime: `2018-08-28 14:29:0${index}`,
      creator: '淘小宝',
      reportName: '手淘双十一测试',
      schemeName: '手淘内容详情页',
      result: '通过',
    };
  });
};

export default class ReportTable extends Component {
  static displayName = 'ReportTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };

  renderOper = () => {
    return (
      <div>
        <a style={styles.link}>详情</a>
        <span style={styles.separator} />
        <a style={styles.link}>申请权限</a>
      </div>
    );
  };

  render() {
    const dataSource = getData();
    const { current } = this.state;

    return (
      <IceContainer style={styles.container}>
        <Table dataSource={dataSource} hasBorder={false}>
          <Table.Column title="测试时间" dataIndex="testTime" />
          <Table.Column title="创建人" dataIndex="creator" />
          <Table.Column title="报告名称" dataIndex="reportName" />
          <Table.Column title="方案名称" dataIndex="schemeName" />
          <Table.Column title="测试结果" dataIndex="result" />
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
    margin: '20px',
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
