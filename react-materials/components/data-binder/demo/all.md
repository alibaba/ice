---
title: 实际场景 Demo
order: 2
importStyle: true
---

演示一个实际场景。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataBinder from '@icedesign/data-binder';
import { Pagination, Table } from '@alifd/next';

@DataBinder({
  account: {
    url: 'https://ice.alicdn.com/assets/mock/53141.json',
    // ajax 参数参见：https://github.com/axios/axios
    defaultBindingData: {
      pagination: {
        page: 1,
        total: 0,
        pageSize: 10
      },
      table: []
    }
  }
})
class App extends Component {

  componentDidMount() {
    const {account} = this.props.bindingData;
    // 第一次渲染，初始化第一页的数据
    this.props.updateBindingData('account', {
      params: {
        ...account.pagination,
        page: 1
      }
    });
  }

  changePage = (pageNo) => {
    // 有些参数可能需要从数据中获取
    const {account} = this.props.bindingData;
    this.props.updateBindingData('account', {
      params: {
        ...account.pagination,
        page: pageNo
      },
      // 通过设置这个数据，可以快速将页码切换，避免等接口返回才会切换页面
      // 这里的变更是同步生效的
      // 需要注意多层级数据更新的处理，避免丢掉某些数据
      defaultBindingData: {
        ...account,
        pagination: {
          ...account.pagination,
          page: pageNo
        }
      }
    });
  };

  render() {
    const {account} = this.props.bindingData;

    return (
      <div>
        <Table dataSource={account.table} loading={account.__loading}>
          <Table.Column dataIndex="name" title="name" />
          <Table.Column dataIndex="age" title="age" />
        </Table>
        <Pagination
          current={account.pagination.page}
          pageSize={account.pagination.pageSize}
          total={account.pagination.total}
          onChange={this.changePage}
          style={{marginTop: 20}}
        />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
