import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import './ChartBar.scss';

export default class ChartBar extends Component {
  static displayName = 'ChartBar';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      {
        name: 'London',
        'Jan.': 18.9,
        'Feb.': 28.8,
        'Mar.': 39.3,
        'Apr.': 81.4,
        May: 47,
        'Jun.': 20.3,
        'Jul.': 24,
        'Aug.': 35.6,
      },
      {
        name: 'Berlin',
        'Jan.': 12.4,
        'Feb.': 23.2,
        'Mar.': 34.5,
        'Apr.': 99.7,
        May: 52.6,
        'Jun.': 35.5,
        'Jul.': 37.4,
        'Aug.': 42.4,
      },
    ];

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'], // 展开字段集
      key: '月份', // key字段
      value: '月均降雨量', // value字段
    });

    return (
      <div className="chart-bar">
        <IceContainer>
          <h4 style={styles.title}>柱状图</h4>
          <Chart height={400} data={dv} forceFit>
            <Axis name="月份" />
            <Axis name="月均降雨量" />
            <Legend />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="interval"
              position="月份*月均降雨量"
              color="name"
              adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
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
