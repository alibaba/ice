import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import IceContainer from '@icedesign/container';

export default class CPUChart extends Component {
  static displayName = 'CPUChart';

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
      { time: '13:50:00', cpu: 12.1 },
      { time: '13:50:30', cpu: 14 },
      { time: '13:51:00', cpu: 13.2 },
      { time: '13:51:30', cpu: 16.4 },
      { time: '13:52:00', cpu: 17.1 },
      { time: '13:52:30', cpu: 18.2 },
      { time: '13:53:00', cpu: 12.7 },
      { time: '13:53:30', cpu: 13.9 },
      { time: '13:54:00', cpu: 16.3 },
      { time: '13:54:30', cpu: 17.4 },
      { time: '13:55:00', cpu: 12.1 },
      { time: '13:55:30', cpu: 12.9 },
    ];

    // DataSet https://github.com/alibaba/BizCharts/blob/master/doc/tutorial/dataset.md#dataset
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['cpu'],
      key: 'cpu',
      value: 'cpu',
    });

    // 定义度量
    const cols = {
      time: {
        range: [0, 1],
        tickCount: 7,
      },
      cpu: {
        min: 0,
        max: 100,
      },
    };

    return (
      <div className="chart-type-line">
        <IceContainer title="CPU利用率">
          <Chart height={300} data={dv} scale={cols} forceFit>
            <Axis name="time" />
            <Axis
              name="cpu"
            />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="line"
              position="time*cpu"
              size={2}
              shape="smooth"
            />
          </Chart>
        </IceContainer>
      </div>
    );
  }
}
