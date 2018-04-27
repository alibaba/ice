/* eslint react/jsx-curly-brace-presence: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Axis, Geom, Tooltip, Coord, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import './StackedBarChart.scss';

export default class StackedBarChart extends Component {
  static displayName = 'StackedBarChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      { State: 'WY', 小于5岁: 25635, '5至13岁': 1890, '14至17岁': 9314 },
      { State: 'DC', 小于5岁: 30352, '5至13岁': 20439, '14至17岁': 10225 },
      { State: 'VT', 小于5岁: 38253, '5至13岁': 42538, '14至17岁': 15757 },
      { State: 'ND', 小于5岁: 51896, '5至13岁': 67358, '14至17岁': 18794 },
      { State: 'AK', 小于5岁: 72083, '5至13岁': 85640, '14至17岁': 22153 },
    ];

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['小于5岁', '5至13岁', '14至17岁'],
      key: '年龄段',
      value: '人口数量',
      retains: ['State'],
    });
    return (
      <div className="stacked-bar-chart">
        <IceContainer title="堆叠条形图">
          <Chart height={400} data={dv} forceFit padding={[60]}>
            <Legend />
            <Coord transpose />
            <Axis name="State" label={{ offset: 12 }} />
            <Axis name="人口数量" />
            <Tooltip />
            <Geom
              type="intervalStack"
              position="State*人口数量"
              color={'年龄段'}
            />
          </Chart>
        </IceContainer>
      </div>
    );
  }
}
