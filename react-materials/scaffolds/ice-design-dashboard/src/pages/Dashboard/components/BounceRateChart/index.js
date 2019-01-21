import React, { Component } from 'react';
import { Chart, Geom, Tooltip } from 'bizcharts';
import ContainerCard from '../../../../components/ContainerCard';

const data = [
  { month: '1', rate: 38 },
  { month: '2', rate: 52 },
  { month: '3', rate: 61 },
  { month: '4', rate: 80 },
  { month: '5', rate: 65 },
  { month: '6', rate: 60 },
  { month: '7', rate: 60 },
  { month: '8', rate: 58 },
  { month: '9', rate: 48 },
  { month: '10', rate: 50 },
  { month: '11', rate: 40 },
  { month: '12', rate: 40 },
];
const cols = {
  rate: { tickInterval: 20, alias: '跳出率' },
};

export default class BounceRateChart extends Component {
  render() {
    return (
      <ContainerCard
        title="跳出率"
        cardStyle={{ margin: '30px 0 20px' }}
        contentStyle={{ padding: '0' }}
      >
        <Chart height={150} forceFit padding={[20]} data={data} scale={cols}>
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="area"
            position="month*rate"
            color="#f7da47"
            shape="smooth"
          />
          <Geom
            type="line"
            position="month*rate"
            color="#f7da47"
            size={2}
            shape="smooth"
          />
        </Chart>
      </ContainerCard>
    );
  }
}
