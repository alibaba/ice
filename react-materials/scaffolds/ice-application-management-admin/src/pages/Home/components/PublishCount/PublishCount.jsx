import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

const data = [
  {
    name: '周一',
    value: 1,
  },
  {
    name: '周二',
    value: 3,
  },
  {
    name: '周三',
    value: 4,
  },
  {
    name: '周四',
    value: 4,
  },
  {
    name: '周五',
    value: 2,
  },
  {
    name: '周六',
    value: 0,
  },
  {
    name: '周天',
    value: 0,
  },
];

const cols = {
  value: {
    tickInterval: 1,
  },
};

export default class PublishCount extends Component {
  static displayName = 'PublishCount';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer title="周发布次数">
        <Chart height={195} padding={[40]} data={data} scale={cols} forceFit>
          <Axis name="name" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="interval" position="name*value" color="#447eff" />
        </Chart>
      </IceContainer>
    );
  }
}
