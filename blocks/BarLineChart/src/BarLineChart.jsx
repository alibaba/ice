import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ReactEcharts from 'echarts-for-react';

/**
 * 图表来源参考：http://gallery.echartsjs.com/editor.html?c=xHyE7GIMdG
 */
export default class BarLineChart extends Component {
  static displayName = 'BarLineChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  getOption = () => {
    return {
      title: {
        text: '自定义的折柱混合--BarLine',
        left: 'center',
        y: '2',
        textStyle: {
          color: '#666',
        },
      },
      backgroundColor: '#fff',
      color: '#384757',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#384757',
          },
        },
      },
      legend: {
        data: [
          {
            name: '待处理',
            icon: 'circle',
            textStyle: {
              color: '#666',
            },
          },
          {
            name: '已处理',
            icon: 'circle',
            textStyle: {
              color: '#666',
            },
          },
          {
            name: '完成率',
            icon: 'circle',
            textStyle: {
              color: '#666',
            },
          },
        ],
        top: '10%',
        textStyle: {
          color: '#fff',
        },
      },
      xAxis: [
        {
          type: 'category',
          data: ['1街', '2街', '3街', '4街', '5街', '6街'],
          axisPointer: {
            type: 'shadow',
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '不文明现象',
          nameTextStyle: {
            color: '#666',
          },
          min: 0,
          max: 50,
          interval: 10,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666',
            },
          },
          axisLine: {
            show: true,
          },
          splitLine: {
            lineStyle: {
              color: '#666',
            },
          },
        },
        {
          type: 'value',
          name: '完成率',
          show: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666',
            },
          },
        },
      ],
      grid: {
        top: '20%',
      },
      series: [
        {
          name: '待处理',
          type: 'bar',
          data: [4, 6, 36, 6, 8, 6],
          barWidth: 'auto',
          itemStyle: {
            normal: {
              color: '#57cb78',
            },
          },
        },
        {
          name: '已处理',
          type: 'bar',
          data: [4, 2, 36, 6, 8, 6],
          barWidth: 'auto',
          itemStyle: {
            normal: {
              color: '#45a3fc',
            },
          },
          barGap: '0',
        },
        {
          name: '完成率',
          type: 'line',
          yAxisIndex: 1,
          data: [100, 33, 100, 100, 100, 100],
          itemStyle: {
            normal: {
              color: '#f0647c',
            },
          },
          smooth: true,
        },
      ],
    };
  };

  render() {
    return (
      <div className="bar-line-chart">
        <IceContainer>
          <ReactEcharts option={this.getOption()} style={{ height: '350px' }} />
        </IceContainer>
      </div>
    );
  }
}
