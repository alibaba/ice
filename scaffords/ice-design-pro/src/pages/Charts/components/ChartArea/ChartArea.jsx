import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import IceContainer from '@icedesign/container';
import './ChartArea.scss';

export default class ChartArea extends Component {
  static displayName = 'ChartArea';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const data = [
      { year: '1996', north: 322, south: 162 },
      { year: '1997', north: 324, south: 90 },
      { year: '1998', north: 329, south: 50 },
      { year: '1999', north: 342, south: 77 },
      { year: '2000', north: 348, south: 35 },
      { year: '2001', north: 334, south: -45 },
      { year: '2002', north: 325, south: -88 },
      { year: '2003', north: 316, south: -120 },
      { year: '2004', north: 318, south: -156 },
      { year: '2005', north: 330, south: -123 },
      { year: '2006', north: 355, south: -88 },
      { year: '2007', north: 366, south: -66 },
      { year: '2008', north: 337, south: -45 },
      { year: '2009', north: 352, south: -29 },
      { year: '2010', north: 377, south: -45 },
      { year: '2011', north: 383, south: -88 },
      { year: '2012', north: 344, south: -132 },
      { year: '2013', north: 366, south: -146 },
      { year: '2014', north: 389, south: -169 },
      { year: '2015', north: 334, south: -184 },
    ];

    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['north', 'south'], // 展开字段集
      key: 'type', // key字段
      value: 'value', // value字段
    });

    const cols = {
      year: {
        range: [0, 1],
      },
    };

    return (
      <div className="chart-area">
        <IceContainer>
          <h4 style={styles.title}>面积图</h4>
          <Chart height={400} data={dv} scale={cols} forceFit>
            <Axis name="year" />
            <Axis
              name="value"
              label={{
                formatter: (val) => {
                  return `${(val / 10000).toFixed(1)}k`;
                },
              }}
            />
            <Legend />
            <Tooltip crosshairs={{ type: 'line' }} />
            <Geom type="area" position="year*value" color="type" />
            <Geom type="line" position="year*value" size={2} color="type" />
          </Chart>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};
