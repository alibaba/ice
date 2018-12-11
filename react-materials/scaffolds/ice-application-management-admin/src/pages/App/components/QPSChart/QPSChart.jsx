import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import IceContainer from '@icedesign/container';

export default class QPSChart extends Component {
  static displayName = 'QPSChart';

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
      { time: '13:50:00', qps: 5150 },
      { time: '13:50:30', qps: 5100 },
      { time: '13:51:00', qps: 5200 },
      { time: '13:51:30', qps: 5250 },
      { time: '13:52:00', qps: 5300 },
      { time: '13:52:30', qps: 5200 },
      { time: '13:53:00', qps: 5200 },
      { time: '13:53:30', qps: 5320 },
      { time: '13:54:00', qps: 5400 },
      { time: '13:54:30', qps: 5540 },
      { time: '13:55:00', qps: 5100 },
      { time: '13:55:30', qps: 5200 },
    ];

    // DataSet https://github.com/alibaba/BizCharts/blob/master/doc/tutorial/dataset.md#dataset
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['qps'],
      key: 'qps',
      value: 'qps',
    });

    // 定义度量
    const cols = {
      time: {
        range: [0, 1],
        tickCount: 7,
      },
      qps: {
        min: 4000,
        max: 6000,
      },
    };

    return (
      <div className="chart-type-line">
        <IceContainer title="应用QPS">
          <Chart height={300} data={dv} scale={cols} forceFit>
            <Axis name="time" />
            <Axis
              name="qps"
            />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="line"
              position="time*qps"
              size={2}
              shape="smooth"
            />
          </Chart>
        </IceContainer>
      </div>
    );
  }
}
