/* eslint no-plusplus: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Label } from 'bizcharts';
import './ChartHeatMap.scss';

export default class ChartHeatMap extends Component {
  static displayName = 'ChartHeatMap';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const data = [
      [0, 0, 10],
      [0, 1, 19],
      [0, 2, 8],
      [0, 3, 24],
      [0, 4, 67],
      [1, 0, 92],
      [1, 1, 58],
      [1, 2, 78],
      [1, 3, 117],
      [1, 4, 48],
      [2, 0, 35],
      [2, 1, 15],
      [2, 2, 123],
      [2, 3, 64],
      [2, 4, 52],
      [3, 0, 72],
      [3, 1, 132],
      [3, 2, 114],
      [3, 3, 19],
      [3, 4, 16],
      [4, 0, 38],
      [4, 1, 5],
      [4, 2, 8],
      [4, 3, 117],
      [4, 4, 115],
      [5, 0, 88],
      [5, 1, 32],
      [5, 2, 12],
      [5, 3, 6],
      [5, 4, 120],
      [6, 0, 13],
      [6, 1, 44],
      [6, 2, 88],
      [6, 3, 98],
      [6, 4, 96],
      [7, 0, 31],
      [7, 1, 1],
      [7, 2, 82],
      [7, 3, 32],
      [7, 4, 30],
      [8, 0, 85],
      [8, 1, 97],
      [8, 2, 123],
      [8, 3, 64],
      [8, 4, 84],
      [9, 0, 47],
      [9, 1, 114],
      [9, 2, 31],
      [9, 3, 48],
      [9, 4, 91],
    ];

    const source = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const obj = {};
      obj.name = item[0];
      obj.day = item[1];
      obj.sales = item[2];
      source.push(obj);
    }

    const cols = {
      name: {
        type: 'cat',
        values: [
          'Alexander',
          'Marie',
          'Maximilian',
          'Sophia',
          'Lukas',
          'Maria',
          'Leon',
          'Anna',
          'Tim',
          'Laura',
        ],
      },
      day: {
        type: 'cat',
        values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      },
    };

    return (
      <div className="chart-heat-map">
        <IceContainer>
          <h4 style={styles.title}>色块图</h4>
          <Chart
            height={500}
            data={source}
            scale={cols}
            padding={[20, 80, 120, 85]}
            forceFit
          >
            <Axis
              name="name"
              grid={{
                align: 'center',
                lineStyle: {
                  lineWidth: 1,
                  lineDash: null,
                  stroke: '#f0f0f0',
                },
                showFirstLine: true,
              }}
            />
            <Axis
              name="day"
              grid={{
                align: 'center',
                lineStyle: {
                  lineWidth: 1,
                  lineDash: null,
                  stroke: '#f0f0f0',
                },
              }}
            />
            <Tooltip />
            <Geom
              type="polygon"
              position="name*day"
              color={['sales', '#BAE7FF-#1890FF-#0050B3']}
              style={{ stroke: '#fff', lineWidth: 1 }}
            >
              <Label
                content="sales"
                offset={-2}
                textStyle={{
                  fill: '#fff',
                  fontWeight: 'bold',
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, .45)',
                }}
              />
            </Geom>
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
