import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import { DataSet } from '@antv/data-set';

export default class SeriesLine extends Component {
  static displayName = 'SeriesLine';

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
      { month: 'Jan', Tokyo: 7.0, London: 20 },
      { month: 'Feb', Tokyo: 6.9, London: 22 },
      { month: 'Mar', Tokyo: 9.5, London: 24 },
      { month: 'Apr', Tokyo: 14.5, London: 30 },
      { month: 'May', Tokyo: 18.4, London: 50 },
      { month: 'Jun', Tokyo: 21.5, London: 65 },
      { month: 'Jul', Tokyo: 25.2, London: 70 },
      { month: 'Aug', Tokyo: 26.5, London: 80 },
      { month: 'Sep', Tokyo: 23.3, London: 85 },
      { month: 'Oct', Tokyo: 18.3, London: 90 },
      { month: 'Nov', Tokyo: 13.9, London: 80 },
      { month: 'Dec', Tokyo: 9.6, London: 70 },
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
      <div className="chart-line">
        <Chart
          height={300}
          data={dv}
          scale={cols}
          forceFit
          padding={[40, 35, 40, 35]}
        >
          <Axis name="month" />
          <Axis name="temperature" label={{ formatter: val => `${val}` }} />
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
            style={styles.point}
          />
        </Chart>
      </div>
    );
  }
}

const styles = {
  point: {
    stroke: '#fff',
    lineWidth: 1,
  },
};
