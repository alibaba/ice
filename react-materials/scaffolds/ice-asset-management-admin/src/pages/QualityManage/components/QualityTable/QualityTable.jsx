import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import TableFilter from './TableFilter';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      grade: `A${index}`,
      average: `99.${index}`,
      standard: '90',
      alltable: `100${index}`,
      isSubstandard: '0',
      tableRowRate: `80.${index}%`,
      notEmptyRate: `${index}0%`,
      uniqueRate: `70.${index}`,
      fluctuateRate: `2.${index}`,
      otherRate: '0',
    };
  });
};

export default class QualityTable extends Component {
  static displayName = 'QualityTable';

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
        <h4 style={styles.title}>等级表概览</h4>
        <TableFilter />
        <Table
          dataSource={dataSource}
          hasBorder={false}
          style={{ padding: '0 20px 20px' }}
        >
          <Table.Column title="等级" dataIndex="grade" />
          <Table.Column title="平均分" dataIndex="average" />
          <Table.Column title="标准分" dataIndex="standard" />
          <Table.Column title="所有表个数" dataIndex="alltable" />
          <Table.Column title="不达标个数" dataIndex="isSubstandard" />
          <Table.Column title="表行数监控率" dataIndex="tableRowRate" />
          <Table.Column title="不为空监控率" dataIndex="notEmptyRate" />
          <Table.Column title="唯一性监控率" dataIndex="uniqueRate" />
          <Table.Column title="波动监控率" dataIndex="fluctuateRate" />
          <Table.Column title="其他监控率" dataIndex="otherRate" />
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
    padding: '0 0 20px',
  },
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee',
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
    textAlign: 'right',
  },
};
