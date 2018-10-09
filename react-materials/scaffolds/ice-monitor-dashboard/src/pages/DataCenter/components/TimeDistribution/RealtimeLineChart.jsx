/* eslint react/no-multi-comp:0, no-unused-vars:0 */
import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

function getComponent() {
  const data = [];
  let chart;
  const scale = {
    time: {
      alias: '时间',
      type: 'time',
      mask: 'MM:ss',
      tickCount: 10,
      nice: false,
    },
    temperature: {
      alias: '平均温度(°C)',
      min: 10,
      max: 35,
    },
    type: {
      type: 'cat',
    },
  };

  class SliderChart extends React.Component {
    constructor() {
      super();
      this.state = {
        data,
      };
    }

    componentDidMount() {
      setInterval(() => {
        const now = new Date();
        const time = now.getTime();
        const temperature1 = parseInt(Math.random() * 5, 10) + 22;
        const temperature2 = parseInt(Math.random() * 7, 10) + 17;

        if (data.length >= 200) {
          data.shift();
          data.shift();
        }

        data.push({
          time,
          temperature: temperature1,
          type: '记录1',
        });
        data.push({
          time,
          temperature: temperature2,
          type: '记录2',
        });
        this.setState({
          data,
        });
      }, 1000);
    }

    render() {
      return (
        <Chart
          height={260}
          padding={[40]}
          data={this.state.data}
          scale={scale}
          forceFit
          onGetG2Instance={(g2Chart) => {
            chart = g2Chart;
          }}
        >
          <Tooltip />
          {this.state.data.length !== 0 ? <Axis /> : ''}
          <Legend />
          <Geom
            type="line"
            position="time*temperature"
            color={['type', ['#ff7f0e', '#2ca02c']]}
            shape="smooth"
            size={2}
          />
        </Chart>
      );
    }
  }

  return SliderChart;
}

class RealtimeLineChart extends React.Component {
  render() {
    const SliderChart = getComponent();
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}

export default RealtimeLineChart;
