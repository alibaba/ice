import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import LibTableFilter from './LibTableFilter';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      isbn: `0000${index}`,
      bookName: '软件工程导论',
      cate: '计算机',
      authName: '淘小宝',
      publisher: '某出版社',
      date: '2018-10-01',
      total: '1000',
      instore: '300',
      price: '22.0',
    };
  });
};

export default class LibTable extends Component {
  static displayName = 'LibTable';

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

  onChange = (selectedItems) => {
    console.log('onChange callback', selectedItems);
  };

  renderOper = () => {
    return (
      <div>
        <a style={{ ...styles.button, ...styles.detailButton }}>查看</a>
        <a style={{ ...styles.button, ...styles.publishButton }}>借阅</a>
      </div>
    );
  };

  renderState = (value) => {
    return <span style={styles.state}>{value}</span>;
  };

  render() {
    const dataSource = getData();
    const { current } = this.state;
    return (
      <div style={styles.container}>
        <LibTableFilter />
        <Table dataSource={dataSource} hasBorder={false} style={styles.table}>
          <Table.Column title="图书 ISBN 号" width={120} dataIndex="isbn" />
          <Table.Column title="图书类型" width={120} dataIndex="bookName" />
          <Table.Column title="图书名称" dataIndex="cate" />
          <Table.Column title="作者名称" dataIndex="authName" />
          <Table.Column title="出版社" dataIndex="publisher" />
          <Table.Column title="日期" dataIndex="date" />
          <Table.Column title="总数量" dataIndex="total" />
          <Table.Column title="在馆数量" dataIndex="instore" />
          <Table.Column title="价格" dataIndex="price" />
          <Table.Column title="操作" width={160} cell={this.renderOper} />
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
  table: {
    marginTop: '10px',
  },
  button: {
    display: 'inline-block',
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '4px',
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  detailButton: {
    background: '#41cac0',
    marginRight: '8px',
  },
  publishButton: {
    background: '#58c9f3',
    marginRight: '8px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'right',
  },
};
