import React from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import DoughnutChart from '../DoughnutChart';

const { Row, Col } = Grid;

const MOCK_DARA = {
  payment: [
    {
      item: '现金',
      count: 20,
    },
    {
      item: '微信',
      count: 10,
    },
    {
      item: '支付宝',
      count: 70,
    },
  ],
  income: [
    {
      item: '现金',
      count: 60,
    },
    {
      item: '微信',
      count: 30,
    },
    {
      item: '支付宝',
      count: 10,
    },
  ],
};

class ReserveChart extends React.Component {
  render() {
    return (
      <IceContainer title="付款方式">
        <Row>
          <Col l="12">
            <DoughnutChart text="付款金额" data={MOCK_DARA.payment} />
          </Col>
          <Col l="12">
            <DoughnutChart text="付款单数" data={MOCK_DARA.income} />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

export default ReserveChart;
