import React, { Component } from 'react';
import { Chart, Geom, Tooltip } from 'bizcharts';
import ContainerCard from '../../../../components/ContainerCard';

const data = [
  { month: '1月', users: 38 },
  { month: '2月', users: 52 },
  { month: '3月', users: 61 },
  { month: '4月', users: 80 },
  { month: '5月', users: 65 },
  { month: '6月', users: 60 },
  { month: '7月', users: 60 },
  { month: '8月', users: 58 },
  { month: '9月', users: 48 },
  { month: '10月', users: 50 },
  { month: '11月', users: 40 },
  { month: '12月', users: 40 },
];
const cols = {
  users: { tickInterval: 20, alias: '用户数' },
};

export default class TotalUserChart extends Component {
  render() {
    return (
      <ContainerCard
        title="总用户趋势"
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
            type="interval"
            position="month*users"
            color="#447eff"
            shape="smooth"
          />
        </Chart>
      </ContainerCard>
    );
  }
}
