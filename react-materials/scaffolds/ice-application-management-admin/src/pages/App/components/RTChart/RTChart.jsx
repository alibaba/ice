import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import IceContainer from '@icedesign/container';

export default class RTChart extends Component {
  static displayName = 'RTChart';

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
      { time: '13:50:00', rt: 60 },
      { time: '13:50:30', rt: 80 },
      { time: '13:51:00', rt: 70 },
      { time: '13:51:30', rt: 59 },
      { time: '13:52:00', rt: 63 },
      { time: '13:52:30', rt: 109 },
      { time: '13:53:00', rt: 78 },
      { time: '13:53:30', rt: 67 },
      { time: '13:54:00', rt: 72 },
      { time: '13:54:30', rt: 80 },
      { time: '13:55:00', rt: 76 },
      { time: '13:55:30', rt: 70 },
    ];

    // DataSet https://github.com/alibaba/BizCharts/blob/master/doc/tutorial/dataset.md#dataset
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['rt'],
      key: 'rt',
      value: 'rt',
    });

    // 定义度量
    const cols = {
      time: {
        range: [0, 1],
        tickCount: 7,
      },
      rt: {
        min: 0,
        max: 200,
      },
    };

    return (
      <div className="chart-type-line">
        <IceContainer title="应用RT">
          <Chart height={300} data={dv} scale={cols} forceFit>
            <Axis name="time" />
            <Axis
              name="rt"
            />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="line"
              position="time*rt"
              size={2}
              shape="smooth"
            />
          </Chart>
        </IceContainer>
      </div>
    );
  }
}
