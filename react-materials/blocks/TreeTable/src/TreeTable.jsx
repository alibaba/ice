import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';

const mockData = [
  {
    tradeCode: 1,
    department: '技术部',
    name: '张三',
    age: 32,
    address: '杭州市西湖区',
    children: [
      {
        tradeCode: 11,
        department: '前端组',
        name: '张三',
        age: 33,
        address: '杭州市西湖区',
      },
      {
        tradeCode: 12,
        department: '终端组',
        name: '张三',
        age: 33,
        address: '杭州市西湖区',
        children: [
          {
            tradeCode: 121,
            department: 'iOS 开发',
            name: '张三',
            age: 33,
            address: '杭州市西湖区',
          },
          {
            tradeCode: 122,
            department: 'Android 开发',
            name: '张三',
            age: 33,
            address: '杭州市西湖区',
          },
        ],
      },
      {
        tradeCode: 13,
        department: '后端组',
        name: '张三',
        age: 33,
        address: '杭州市西湖区',
        children: [
          {
            tradeCode: 131,
            department: '服务端',
            name: '张三',
            age: 33,
            address: '杭州市西湖区',
            children: [
              {
                tradeCode: 1311,
                department: 'Java 开发',
                name: '张三',
                age: 33,
                address: '杭州市西湖区',
              },
              {
                tradeCode: 1312,
                department: 'PHP 开发',
                name: '张三',
                age: 33,
                address: '杭州市西湖区',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    tradeCode: 2,
    department: '设计部',
    name: '张三',
    age: 32,
    address: '杭州市西湖区',
    children: [],
  },
  {
    tradeCode: 3,
    department: '产品部',
    name: '张三',
    age: 32,
    address: '杭州市西湖区',
    children: [],
  },
  {
    tradeCode: 4,
    department: '运营部',
    name: '张三',
    age: 32,
    address: '杭州市西湖区',
    children: [],
  },
];

export default class TreeTable extends Component {
  static displayName = 'TreeTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handleChange = (current) => {
    this.setState({
      current,
    });
  };

  render() {
    return (
      <IceContainer>
        <Table
          dataSource={mockData}
          primaryKey="tradeCode"
          isTree
          rowSelection={{ onChange: () => {} }}
        >
          <Table.Column title="部门" dataIndex="department" />
          <Table.Column title="规则编号" dataIndex="tradeCode" />
          <Table.Column title="名称" dataIndex="name" />
          <Table.Column title="年龄" dataIndex="age" />
          <Table.Column title="地址" dataIndex="address" />
        </Table>
        <Pagination
          style={{ marginTop: '20px', textAlign: 'right' }}
          current={this.state.current}
          onChange={this.handleChange}
        />
      </IceContainer>
    );
  }
}
