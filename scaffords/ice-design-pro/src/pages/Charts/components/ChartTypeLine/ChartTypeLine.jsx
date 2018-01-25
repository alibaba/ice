import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import IceContainer from '@icedesign/container';
import './ChartTypeLine.scss';

export default class ChartTypeLine extends Component {
  static displayName = 'ChartTypeLine';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    // 数据源
    const data = [
      { month: 'Jan', Tokyo: 7.0, London: 3.9 },
      { month: 'Feb', Tokyo: 6.9, London: 4.2 },
      { month: 'Mar', Tokyo: 9.5, London: 5.7 },
      { month: 'Apr', Tokyo: 14.5, London: 8.5 },
      { month: 'May', Tokyo: 18.4, London: 11.9 },
      { month: 'Jun', Tokyo: 21.5, London: 15.2 },
      { month: 'Jul', Tokyo: 25.2, London: 17.0 },
      { month: 'Aug', Tokyo: 26.5, London: 16.6 },
      { month: 'Sep', Tokyo: 23.3, London: 14.2 },
      { month: 'Oct', Tokyo: 18.3, London: 10.3 },
      { month: 'Nov', Tokyo: 13.9, London: 6.6 },
      { month: 'Dec', Tokyo: 9.6, London: 4.8 },
    ];

    // DataSet https://github.com/alibaba/BizCharts/blob/master/doc/tutorial/dataset.md#dataset
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['Tokyo', 'London'],
      key: 'city',
      value: 'temperature',
    });

    // 定义度量
    const cols = {
      month: {
        range: [0, 1],
      },
    };

    return (
      <div className="chart-type-line">
        <IceContainer>
          <h4 style={styles.title}>折线图</h4>
          <Chart height={400} data={dv} scale={cols} forceFit>
            <Axis name="month" />
            <Axis name="temperature" label={{ formatter: val => `${val}°C` }} />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="line"
              position="month*temperature"
              size={2}
              color="city"
              shape="smooth"
            />
            <Geom
              type="point"
              position="month*temperature"
              size={4}
              shape="circle"
              color="city"
              style={{ stroke: '#fff', lineWidth: 1 }}
            />
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
