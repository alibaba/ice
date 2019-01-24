import React, { Component } from 'react';
import { Message, Button } from '@alifd/next';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';
import styles from './LibTable.module.scss';

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
    return (
      <div>
        <Button style={{ marginRight: '5px' }} onClick={this.handleDetailClick}>
          查看
        </Button>
        <Button
          type="primary"
          className={styles.borrowButton}
          onClick={this.handleBorrowClick}
        >
          借阅
        </Button>
      </div>
    );
  };

  render() {
    const { isLoading, dataSource } = this.state;
    const columns = [
      {
        title: 'ISBN 号',
        dataIndex: 'isbn',
      },
      {
        title: '图书类型',
        dataIndex: 'cate',
      },
      {
        title: '图书名称',
        dataIndex: 'bookName',
        width: 150,
      },
      {
        title: '作者名称',
        dataIndex: 'authName',
      },
      {
        title: '出版社',
        dataIndex: 'publisher',
      },
      {
        title: '日期',
        dataIndex: 'date',
      },
      {
        title: '总数量',
        dataIndex: 'total',
      },
      {
        title: '在馆数量',
        dataIndex: 'instore',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '操作',
        dataIndex: 'oper',
        cell: this.renderOper,
        width: 150,
      },
    ];
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
        label: '作者名称',
        component: 'Input',
        componnetProps: {
          placeholder: '请输入',
        },
        formBinderProps: {
          name: 'authorName',
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
        label: '图书分类',
        component: 'Input',
        componnetProps: {
          placeholder: '请选择',
          options: [
            {
              lable: '技术领域',
              value: 'technology',
            },
            {
              lable: '专业领域',
              value: 'professional',
            },
            {
              lable: '管理沟通',
              value: 'management',
            },
            {
              lable: '其他',
              value: 'other',
            },
          ],
        },
        formBinderProps: {
          name: 'cate',
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
