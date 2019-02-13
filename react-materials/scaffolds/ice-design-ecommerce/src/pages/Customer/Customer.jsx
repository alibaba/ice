import React, { Component } from 'react';
import { Dialog, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import CustomTable from '../../components/CustomTable';

const defaultSearchQuery = {
  keyword: '',
  identity: '',
  tag: '',
  card: '',
  integral: '',
  buy: '',
  price: [],
  time: [],
  checkbox: 'false',
};

const formConfig = [
  {
    label: '关键词',
    component: 'Input',
    componentProps: {
      placeholder: '请输入关键词',
    },
    formBinderProps: {
      name: 'keyword',
      required: false,
      message: '请输入正确的关键词',
    },
  },
  {
    label: '客户身份',
    component: 'Select',
    componentProps: {
      placeholder: '请选择',
      dataSource: [
        { label: '全部', value: '0' },
        { label: '会员', value: '1' },
        { label: '非会员', value: '2' },
      ],
    },
    formBinderProps: {
      name: 'identity',
    },
  },
  {
    label: '客户类型',
    component: 'Select',
    componentProps: {
      placeholder: '请选择',
      dataSource: [
        { label: '高级客户', value: '1' },
        { label: '初级客户', value: '2' },
      ],
    },
    formBinderProps: {
      name: 'tag',
    },
  },
  {
    label: '会员积分',
    component: 'Input',
    componentProps: {
      placeholder: '请输入',
    },
    formBinderProps: {
      name: 'integral',
    },
  },
  {
    label: '购买次数',
    component: 'Input',
    componentProps: {
      placeholder: '请输入',
    },
    formBinderProps: {
      name: 'buy',
    },
  },
  {
    label: '单价',
    component: 'Input',
    componentProps: {
      placeholder: '请输入',
    },
    formBinderProps: {
      name: 'price',
    },
  },
  {
    label: '消费时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: '请选择日期',
    },
    formBinderProps: {
      name: 'time',
    },
  },
  {
    label: '查询我签约的客户',
    component: 'Checkbox',
    componentProps: {},
    formBinderProps: {
      name: 'checkbox',
    },
  },
];

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const mockData = Array.from({ length: 10 }).map(() => {
  return {
    keyword: ['淘小宝', '淘二宝'][random(0, 1)],
    identity: ['会员', '非会员'][random(0, 1)],
    tag: ['初级会员', '高级会员'][random(0, 1)],
    card: random(10000, 100000),
    integral: random(1000, 10000),
    buy: random(100, 500),
    price: random(2000, 5000),
    time: '2018-11-11',
    checkbox: 'false',
  };
});

export default class Customer extends Component {
  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '只有管理员才能查看客户的具体信息',
    });
  };

  renderOper = () => {
    return (
      <div>
        <Button text onClick={this.handleDetail}>
          查看
        </Button>
        <span style={styles.separator} />
        <Button text onClick={this.handleDelete}>
          删除
        </Button>
      </div>
    );
  };

  getTableColumns = () => {
    return [
      {
        title: '关键词',
        dataIndex: 'keyword',
        key: 'keyword',
        lock: true,
      },
      {
        title: '客户身份',
        dataIndex: 'identity',
        key: 'identity',
        lock: true,
      },
      {
        title: '客户类型',
        dataIndex: 'tag',
        key: 'tag',
      },
      {
        title: '会员卡',
        dataIndex: 'card',
        key: 'card',
      },
      {
        title: '积分',
        dataIndex: 'integral',
        key: 'integral',
      },
      {
        title: '购买次数',
        dataIndex: 'buy',
        key: 'buy',
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '消费时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '操作',
        dataIndex: 'detail',
        key: 'detail',
        cell: this.renderOper,
      },
    ];
  };

  render() {
    return (
      <IceContainer title="客户管理">
        <CustomTable
          columns={this.getTableColumns()}
          dataSource={mockData}
          searchQueryHistory={defaultSearchQuery}
          formConfig={formConfig}
        />
      </IceContainer>
    );
  }
}

const styles = {
  separator: {
    margin: '0 8px',
    display: 'inline-block',
    height: '12px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
};
