import React from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import DoughnutChart from '../DoughnutChart';

const { Row, Col } = Grid;

const MOCK_DARA = {
  income: [
    {
      item: '网店预付金额',
      count: 30,
    },
    {
      item: '实体店预付金额',
      count: 70,
    },
  ],
  order: [
    {
      item: '网店预约',
      count: 80,
    },
    {
      item: '实体店预约',
      count: 20,
    },
  ],
};

class ReserveChart extends React.Component {
  render() {
    return (
      <IceContainer title="预约概况">
        <Row>
          <Col l="12">
            <DoughnutChart text="预付金额" data={MOCK_DARA.income} />
          </Col>
          <Col l="12">
            <DoughnutChart text="预约订单" data={MOCK_DARA.order} />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

export default ReserveChart;
