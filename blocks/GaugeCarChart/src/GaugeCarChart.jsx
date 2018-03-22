import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ReactEcharts from 'echarts-for-react';

export default class GaugeCarChart extends Component {
  static displayName = 'GaugeCarChart';

  static propTypes = {};

  static defaultProps = {};

  getOption = () => {
    return {
      backgroundColor: '#1b1b1b',
      tooltip: {
        formatter: '{a} <br/>{c} {b}',
      },
      series: [
        {
          name: '速度',
          type: 'gauge',
          min: 0,
          max: 220,
          splitNumber: 11,
          radius: '50%',
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
              width: 3,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          axisLabel: {
            // 坐标轴小标记
            textStyle: {
              // 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          axisTick: {
            // 坐标轴小标记
            length: 15, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: 'auto',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          splitLine: {
            // 分隔线
            length: 25, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          pointer: {
            // 分隔线
            shadowColor: '#fff', // 默认透明
            shadowBlur: 5,
          },
          title: {
            textStyle: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          detail: {
            backgroundColor: 'rgba(30,144,255,0.8)',
            borderWidth: 1,
            borderColor: '#fff',
            shadowColor: '#fff', // 默认透明
            shadowBlur: 5,
            offsetCenter: [0, '50%'], // x, y，单位px
            textStyle: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              color: '#fff',
            },
          },
          data: [{ value: 40, name: 'km/h' }],
        },
        {
          name: '转速',
          type: 'gauge',
          center: ['25%', '55%'], // 默认全局居中
          radius: '30%',
          min: 0,
          max: 7,
          endAngle: 45,
          splitNumber: 7,
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: [[0.29, 'lime'], [0.86, '#1e90ff'], [1, '#ff4500']],
              width: 2,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          axisLabel: {
            // 坐标轴小标记
            textStyle: {
              // 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          axisTick: {
            // 坐标轴小标记
            length: 12, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: 'auto',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          splitLine: {
            // 分隔线
            length: 20, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          pointer: {
            width: 5,
            shadowColor: '#fff', // 默认透明
            shadowBlur: 5,
          },
          title: {
            offsetCenter: [0, '-30%'], // x, y，单位px
            textStyle: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontStyle: 'italic',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          detail: {
            borderColor: '#fff',
            shadowColor: '#fff', // 默认透明
            shadowBlur: 5,
            width: 80,
            height: 30,
            offsetCenter: [25, '20%'], // x, y，单位px
            textStyle: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              color: '#fff',
            },
          },
          data: [{ value: 1.5, name: 'x1000 r/min' }],
        },
        {
          name: '油表',
          type: 'gauge',
          center: ['75%', '50%'], // 默认全局居中
          radius: '30%',
          min: 0,
          max: 2,
          startAngle: 135,
          endAngle: 45,
          splitNumber: 2,
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
              width: 2,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          axisTick: {
            // 坐标轴小标记
            length: 12, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: 'auto',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          axisLabel: {
            textStyle: {
              // 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
            formatter: (v) => {
              switch (`${v}`) {
                case '0':
                  return 'E';
                case '1':
                  return 'Gas';
                case '2':
                  return 'F';
                default:
                  return '';
              }
            },
          },
          splitLine: {
            // 分隔线
            length: 15, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          pointer: {
            width: 2,
            shadowColor: '#fff', // 默认透明
            shadowBlur: 5,
          },
          title: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [{ value: 0.5, name: 'gas' }],
        },
        {
          name: '水表',
          type: 'gauge',
          center: ['75%', '50%'], // 默认全局居中
          radius: '30%',
          min: 0,
          max: 2,
          startAngle: 315,
          endAngle: 225,
          splitNumber: 2,
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
              width: 2,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          axisTick: {
            // 坐标轴小标记
            show: false,
          },
          axisLabel: {
            textStyle: {
              // 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
            formatter: (v) => {
              switch (`${v}`) {
                case '0':
                  return 'H';
                case '1':
                  return 'Water';
                case '2':
                  return 'C';
                default:
                  return '';
              }
            },
          },
          splitLine: {
            // 分隔线
            length: 15, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10,
            },
          },
          pointer: {
            width: 2,
            shadowColor: '#fff', // 默认透明
            shadowBlur: 5,
          },
          title: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [{ value: 0.5, name: 'gas' }],
        },
      ],
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <ReactEcharts option={this.getOption()} style={{ height: '540px' }} />
      </IceContainer>
    );
  }
}
