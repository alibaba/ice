import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import BorrowTableFilter from './BorrowTableFilter';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      number: `${index}`,
      isbn: `1000${index}`,
      cate: '计算机',
      bookName: '软件工程导论',
      idCard: `12345${index}`,
      authorName: '淘小宝',
      borrowDate: '2018-10-01',
      returnDate: '2019-10-01',
    };
  });
};

export default class BorrowTable extends Component {
  static displayName = 'BorrowTable';

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
    return <a style={{ ...styles.button, ...styles.detailButton }}>查看</a>;
  };

  renderState = (value) => {
    return <span style={styles.state}>{value}</span>;
  };

  render() {
    const dataSource = getData();
    const { current } = this.state;
    return (
      <div style={styles.container}>
        <BorrowTableFilter />
        <Table dataSource={dataSource} hasBorder={false} style={styles.table}>
          <Table.Column title="借阅编号" dataIndex="number" />
          <Table.Column title="图书 ISBN 号" dataIndex="isbn" />
          <Table.Column title="图书名称" dataIndex="bookName" />
          <Table.Column title="图书类型" dataIndex="cate" />
          <Table.Column title="读者证件号" dataIndex="idCard" />
          <Table.Column title="读者名称" dataIndex="authorName" />
          <Table.Column title="借阅日期" dataIndex="borrowDate" />
          <Table.Column title="归还日期" dataIndex="borrowDate" />
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
  pagination: {
    margin: '20px 0',
    textAlign: 'right',
  },
};
