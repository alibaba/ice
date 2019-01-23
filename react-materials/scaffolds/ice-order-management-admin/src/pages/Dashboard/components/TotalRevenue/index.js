import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class TotalRevenue extends Component {
  render() {
    const data = [
      { month: '1月', amount: 0 },
      { month: '2月', amount: 52 },
      { month: '3月', amount: 61 },
      { month: '4月', amount: 80 },
      { month: '5月', amount: 65 },
      { month: '6月', amount: 70 },
      { month: '7月', amount: 80 },
      { month: '8月', amount: 90 },
      { month: '9月', amount: 85 },
      { month: '10月', amount: 100 },
      { month: '11月', amount: 110 },
      { month: '12月', amount: 120 },
    ];
    const cols = {
      amount: { tickInterval: 20, alias: '总营收(亿)' },
    };

    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="总营收" />
        <Chart
          height={300}
          forceFit
          padding={[60, 40]}
          data={data}
          scale={cols}
        >
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Axis />
          <Geom
            type="area"
            position="month*amount"
            color="#447eff"
            shape="smooth"
          />
          <Geom
            type="line"
            position="month*amount"
            color="#447eff"
            size={2}
            shape="smooth"
          />
        </Chart>
      </IceContainer>
    );
  }
}
