import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class OrderCate extends Component {
  render() {
    const data = [
      { month: '1', customer: 38 },
      { month: '2', customer: 52 },
      { month: '3', customer: 61 },
      { month: '4', customer: 80 },
      { month: '5', customer: 65 },
      { month: '6', customer: 60 },
    ];
    const cols = {
      customer: { tickInterval: 20, alias: '新增客户' },
    };

    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="新增客户趋势" />
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
            position="month*customer"
            color="#447eff"
            shape="smooth"
          />
          <Geom
            type="line"
            position="month*customer"
            color="#447eff"
            size={2}
            shape="smooth"
          />
        </Chart>
      </IceContainer>
    );
  }
}
