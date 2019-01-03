import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Title from './Title';

const option = {
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    top: '40',
    left: '0',
    right: '0',
    bottom: '0',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: '#90979c',
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#90979c',
        },
      },
    },
  ],
  series: [
    {
      name: '直接访问',
      type: 'bar',
      barWidth: '60%',
      color: ['#5e83fb'],
    },
  ],
};

export default class LineChart extends Component {
  static displayName = 'LineChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

    option.xAxis[0].data = data.map((d) => {
      return d.name;
    });
    option.series[0].data = data.map((d) => {
      return d.value;
    });

    return (
      <div style={{ height: '33%' }}>
        <Title data={this.props.title} />
        <ReactEcharts option={option} style={{ height: '100%' }} />
      </div>
    );
  }
}
