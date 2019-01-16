import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';

const generatorData = () => {
  return Array.from({ length: 5 }).map((item, index) => {
    return {
      key: index + 1,
      name: 'iPhone X',
      price: '8316',
      memory: '256GB',
      quantity: '2000',
      comment: '86371',
      desc:
        '所有在 Apple Store 官方旗舰店的订单的发货时间、付款期限及购买上限均以商品页面规定为准。所有在本店销售的商品，请在拍下后 15 分钟内完成支付。逾期，您的订单将被关闭。简约而不简单的设计，凸显品质，强韧张丽，抗摔设计，防水抗污，更经久耐用，以优质环保 PC 材料原材料，手感细腻顺滑，让你爱不释手。',
    };
  });
};

export default class ExpandedTable extends Component {
  static displayName = 'ExpandedTable';

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

  handleRowSelection = (selectedRowKeys, records) => {
    console.log('selectedRowKeys:', selectedRowKeys);
    console.log('records:', records);
  };

  render() {
    const data = generatorData();
    const rowSelection = {
      onChange: this.handleRowSelection,
      mode: 'single',
    };

    return (
      <IceContainer>
        <Table
          hasBorder={false}
          dataSource={data}
          primaryKey="key"
          expandedRowRender={(record) => record.desc}
          rowSelection={rowSelection}
        >
          <Table.Column title="Key" dataIndex="key" />
          <Table.Column title="名称" dataIndex="name" />
          <Table.Column title="价格" dataIndex="price" />
          <Table.Column title="内存容量" dataIndex="memory" />
          <Table.Column title="库存数量" dataIndex="quantity" />
          <Table.Column title="累计评价" dataIndex="comment" />
        </Table>
        <Pagination
          style={{ marginTop: '20px', textAlign: 'right' }}
          current={this.state.current}
          onChange={this.handlePaginationChange}
        />
      </IceContainer>
    );
  }
}
