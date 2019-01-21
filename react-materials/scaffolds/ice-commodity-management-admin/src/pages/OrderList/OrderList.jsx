import React, { Component } from 'react';
import { Dialog, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import CustomTable from '../../components/CustomTable';
import PageHead from '../../components/PageHead';

const defaultSearchQuery = {
  id: '',
  goodId: '',
  applyCode: '',
  name: '',
  state: '',
  orderType: '',
  createTime: [],
  refundTime: [],
  orderTime: [],
  payment: '',
  transport: '',
  checkbox: 'false',
};

const formConfig = [
  {
    label: '订单编号',
    component: 'Input',
    componentProps: {
      placeholder: '请输入订单编号',
    },
    formBinderProps: {
      name: 'id',
      required: false,
      message: '请输入正确的订单编号',
    },
  },
  {
    label: '商品编号',
    component: 'Input',
    componentProps: {
      placeholder: '请输入商品编号',
    },
    formBinderProps: {
      name: 'goodId',
      required: false,
      message: '请输入正确的商品编号',
    },
  },
  {
    label: '申请单号',
    component: 'Input',
    componentProps: {
      placeholder: '请输入申请单号',
    },
    formBinderProps: {
      name: 'applyCode',
    },
  },
  {
    label: '订单名称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入订单名称',
    },
    formBinderProps: {
      name: 'name',
    },
  },
  {
    label: '订单状态',
    component: 'Select',
    componentProps: {
      placeholder: '请选择',
      dataSource: [
        { label: '已发货', value: 'option1' },
        { label: '代发货', value: 'option2' },
      ],
    },
    formBinderProps: {
      name: 'state',
    },
  },
  {
    label: '订单类型',
    component: 'Select',
    componentProps: {
      placeholder: '请选择',
      dataSource: [
        { label: '普通订单', value: 'option1' },
        { label: '代付订单', value: 'option2' },
      ],
    },
    formBinderProps: {
      name: 'orderType',
    },
  },
  {
    label: '创建时间',
    component: 'RangePicker',
    advanced: true,
    componentProps: {
      placeholder: '请选择日期',
    },
    formBinderProps: {
      name: 'createTime',
    },
  },
  {
    label: '下单时间',
    component: 'RangePicker',
    advanced: true,
    componentProps: {
      placeholder: '请选择日期',
    },
    formBinderProps: {
      name: 'orderTime',
    },
  },
  {
    label: '退款时间',
    component: 'RangePicker',
    advanced: true,
    componentProps: {
      placeholder: '请选择日期',
    },
    formBinderProps: {
      name: 'refundTime',
    },
  },
  {
    label: '付款方式',
    component: 'Select',
    advanced: true,
    componentProps: {
      placeholder: '请选择',
      dataSource: [
        { value: '1', label: '支付宝付款' },
        { value: '2', label: '银行卡付款' },
        { value: '3', label: '微信付款' },
        { value: '4', label: '找人代付' },
      ],
    },
    formBinderProps: {
      name: 'payment',
    },
  },
  {
    label: '物流方式',
    component: 'Select',
    advanced: true,
    componentProps: {
      placeholder: '请选择',
      dataSource: [
        { label: '快递发货', value: '1' },
        { label: '上门自提', value: '2' },
        { label: '同城配送', value: '3' },
      ],
    },
    formBinderProps: {
      name: 'transport',
    },
  },
  {
    label: '查询我处理过的订单',
    component: 'Checkbox',
    advanced: true,
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
    id: random(1, 100),
    goodId: random(200, 1000),
    name: ['淘公仔', '天猫精灵', '蓝牙音响'][random(1, 2)],
    payment:
      ['支付宝付款', '银行卡付款', '微信付款'][random(1, 2)] || '支付宝付款',
    orderType: ['普通订单', '代付订单'][random(0, 1)],
    createTime: '2018-12-12',
    state: '派送中',
    transport: ['快递发货', '上门自提', '同城配送'][random(0, 2)],
  };
});

export default class OrderList extends Component {
  renderState = (value) => {
    return (
      <div style={styles.state}>
        <span style={styles.stateText}>{value}</span>
      </div>
    );
  };

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '只有管理员才能查看具体的订单信息',
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
        title: '订单编号',
        dataIndex: 'id',
        key: 'id',
        lock: true,
      },
      {
        title: '商品编号',
        dataIndex: 'goodId',
        key: 'goodId',
        lock: true,
      },
      {
        title: '订单名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '付款方式',
        dataIndex: 'payment',
        key: 'payment',
      },
      {
        title: '订单类型',
        dataIndex: 'orderType',
        key: 'orderType',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '物流方式',
        dataIndex: 'transport',
        key: 'transport',
      },
      {
        title: '订单状态',
        dataIndex: 'state',
        key: 'state',
        cell: this.renderState,
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
      <div>
        <PageHead title="订单管理" />
        <IceContainer>
          <CustomTable
            columns={this.getTableColumns()}
            dataSource={mockData}
            searchQueryHistory={defaultSearchQuery}
            formConfig={formConfig}
            hasAdvance
          />
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  stateText: {
    display: 'inline-block',
    padding: '5px 10px',
    color: '#5e83fb',
    background: '#fff',
    border: '1px solid #5e83fb',
    borderRadius: '4px',
  },
  separator: {
    margin: '0 8px',
    display: 'inline-block',
    height: '12px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
};
