import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import IceContainer from '@icedesign/container';

class Basic extends React.Component {
  render() {
    const data = [
      {
        year: '2010',
        value: 3,
      },
      {
        year: '2011',
        value: 4,
      },
      {
        year: '2012',
        value: 3.5,
      },
      {
        year: '2013',
        value: 5,
      },
      {
        year: '2014',
        value: 4.9,
      },
      {
        year: '2015',
        value: 6,
      },
      {
        year: '2016',
        value: 7,
      },
      {
        year: '2017',
        value: 9,
      },
      {
        year: '2018',
        value: 13,
      },
    ];
    const cols = {
      value: {
        min: 0,
        alias: '薪资',
      },
      year: {
        range: [0, 1],
      },
    };
    return (
      <IceContainer title="薪资趋势">
        <Chart height={400} data={data} scale={cols} forceFit padding={[40]}>
          <Axis name="year" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="year*value" size={2} />
          <Geom
            type="point"
            position="year*value"
            size={4}
            shape="circle"
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </IceContainer>
    );
  }
}

export default Basic;
