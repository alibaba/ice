import React, { Component } from 'react';
import { Message } from '@alifd/next';
import CustomTable from './CustomTable';
import TableFilter from './TableFilter';

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
      isLoading: false,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  mockApi = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData());
      }, 600);
    });
  };

  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi().then((dataSource) => {
          this.setState({
            dataSource,
            isLoading: false,
          });
        });
      }
    );
  };

  handlePaginationChange = (current) => {
    this.fetchData(current);
  };

  handleBorrowClick = () => {
    Message.success('借阅成功');
  };

  handleDetailClick = () => {
    Message.success('暂无详细信息');
  };

  handleFilter = () => {
    this.fetchData();
  };

  renderOper = () => {
    return <a style={{ ...styles.button, ...styles.detailButton }}>查看</a>;
  };

  render() {
    const { isLoading, dataSource } = this.state;
    const config = [
      {
        label: '图书名称',
        component: 'Input',
        componnetProps: {
          placeholder: '请输入',
        },
        formBinderProps: {
          name: 'bookName',
          triggerType: 'onBlur',
        },
      },
      {
        label: 'ISBN 号',
        component: 'Input',
        componnetProps: {
          placeholder: '请输入',
        },
        formBinderProps: {
          name: 'isbn',
          triggerType: 'onBlur',
        },
      },
      {
        label: '出版社',
        component: 'Input',
        componnetProps: {
          placeholder: '请输入',
        },
        formBinderProps: {
          name: 'publisher',
          triggerType: 'onBlur',
        },
      },
    ];
    const columns = [
      {
        title: '借阅编号',
        dataIndex: 'number',
      },
      {
        title: '图书 ISBN 号',
        dataIndex: 'isbn',
      },
      {
        title: '图书名称',
        dataIndex: 'bookName',
      },
      {
        title: '图书类型',
        dataIndex: 'cate',
      },
      {
        title: '读者证件号',
        dataIndex: 'idCard',
      },
      {
        title: '读者名称',
        dataIndex: 'authorName',
      },
      {
        title: '借阅日期',
        dataIndex: 'borrowDate',
      },
      {
        title: '归还日期',
        dataIndex: 'returnDate',
      },
      {
        title: '操作',
        dataIndex: 'oper',
        cell: this.renderOper,
      },
    ];
    return (
      <div style={styles.container}>
        <TableFilter config={config} onChange={this.handleFilter} />
        <CustomTable
          isLoading={isLoading}
          dataSource={dataSource}
          columns={columns}
          paginationChange={this.handlePaginationChange}
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
};
