import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ReactEcharts from 'echarts-for-react';

/**
 * 图表来源参考：http://gallery.echartsjs.com/editor.html?c=xBJSFJgFFf
 */
export default class CustomPieChart extends Component {
  static displayName = 'CustomPieChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  getOption = () => {
    const man = 58;
    const woman = 42;
    const city = 65;
    const coun = 35;
    const Icons = {
      man: require('./images/TB1ek8heL9TBuNjy0FcXXbeiFXa-12-26.png'),
      woman: require('./images/TB1zi90eSBYBeNjy0FeXXbnmFXa-12-26.png'),
      city: require('./images/TB1fA8heL9TBuNjy0FcXXbeiFXa-24-21.png'),
      coun: require('./images/TB1fCxOeN9YBuNjy0FfXXXIsVXa-24-24.png'),
    };
    return {
      backgroundColor: '#fff',
      tooltip: {
        formatter: '{b} ({c})',
      },
      grid: [
        {
          show: false,
          left: '15%',
          top: '70%',
          width: '30%',
          height: 120,
        },
        {
          show: false,
          left: '55%',
          top: '70%',
          width: '30%',
          height: 120,
        },
      ],
      xAxis: [
        {
          gridIndex: 0,
          type: 'value',
          min: -50,
          max: 180,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        {
          gridIndex: 1,
          type: 'value',
          min: -50,
          max: 180,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          gridIndex: 0,
          type: 'category',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed',
            },
          },
          data: ['男性', '女性'],
          inverse: true,
          axisLabel: {
            color: '#666',
            fontsize: 14,
            width: 55,
            margin: -65,
            rich: {
              man: {
                height: 25,
                align: 'center',
                backgroundColor: {
                  image: Icons.man,
                },
              },
              men: {
                height: 25,
                align: 'center',
                backgroundColor: {
                  image: Icons.woman,
                },
              },
            },
          },
        },
        {
          gridIndex: 1,
          type: 'category',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed',
            },
          },
          data: ['城镇', '乡村'],
          inverse: true,
          axisLabel: {
            color: '#666',
            fontsize: 14,
            width: 55,
            margin: -65,
            rich: {
              city: {
                height: 20,
                align: 'center',
                backgroundColor: {
                  image: 'Icons.city',
                },
              },
              coun: {
                height: 20,
                align: 'center',
                backgroundColor: {
                  image: Icons.coun,
                },
              },
            },
          },
        },
      ],
      series: [
        {
          name: '性别结构',
          type: 'pie',
          radius: '35%',
          center: ['30%', '40%'],
          clockwise: false,
          data: [
            {
              value: man,
              name: '男性',
            },
            {
              value: woman,
              name: '女性',
            },
          ],
          itemStyle: {
            normal: {
              color: (params) => {
                const colorList = ['#44a3fc', '#f0647c'];
                return colorList[params.dataIndex];
              },
            },
          },
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
        },
        {
          name: '性别外圈',
          type: 'pie',
          radius: ['40%', '40%'],
          center: ['30%', '40%'],
          clockwise: false,
          hoverAnimation: false,
          data: [
            {
              value: 4,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            },
            {
              value: man,
              name: '男性',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#44a3fc',
                },
              },
            },
            {
              value: 4,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            },
            {
              value: woman,
              name: '女性',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#f0647c',
                },
              },
            },
          ],

          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
        },
        {
          name: '性别',
          type: 'pictorialBar',
          symbol: 'rect',
          data: [
            {
              value: man,
              symbolRepeat: true,
              symbolSize: [6, 23],
              symbolMargin: 2,
            },
            {
              value: woman,
              symbolRepeat: true,
              symbolSize: [6, 23],
              symbolMargin: 2,
            },
          ],
          itemStyle: {
            normal: {
              color: (params) => {
                const colorList = ['#44a3fc', '#f0647c'];
                return colorList[params.dataIndex];
              },
            },
          },
          label: {
            normal: {
              show: true,
              color: '#666',
              fontSize: 15,
              position: [120, 10],
              formatter: '{c}%',
            },
          },
          xAxisIndex: 0,
          yAxisIndex: 0,
          barWidth: '50%',
        },
        {
          name: '城乡结构',
          type: 'pie',
          radius: '35%',
          center: ['70%', '40%'],
          clockwise: false,
          data: [
            {
              value: city,
              name: '城镇',
            },
            {
              value: coun,
              name: '乡村',
            },
          ],
          itemStyle: {
            normal: {
              color: (params) => {
                const colorList = ['#fad551', '#57cc78'];
                return colorList[params.dataIndex];
              },
            },
          },
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
        },
        {
          name: '城乡外圈',
          type: 'pie',
          radius: ['40%', '40%'],
          center: ['70%', '40%'],
          clockwise: false,
          hoverAnimation: false,
          data: [
            {
              value: 4,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            },
            {
              value: city,
              name: '城镇',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#fad551',
                },
              },
            },
            {
              value: 4,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            },
            {
              value: coun,
              name: '乡村',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#57cc78',
                },
              },
            },
          ],

          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
        },
        {
          name: '城乡',
          type: 'pictorialBar',
          symbol: 'rect',
          data: [
            {
              value: city,
              symbolRepeat: true,
              symbolSize: [6, 23],
              symbolMargin: 2,
            },
            {
              value: coun,
              symbolRepeat: true,
              symbolSize: [6, 23],
              symbolMargin: 2,
            },
          ],
          itemStyle: {
            normal: {
              color: (params) => {
                const colorList = ['#fad551', '#57cc78'];
                return colorList[params.dataIndex];
              },
            },
          },
          label: {
            normal: {
              show: true,
              color: '#666',
              fontSize: 15,
              position: [120, 10],
              formatter: '{c}%',
            },
          },
          xAxisIndex: 1,
          yAxisIndex: 1,
          barWidth: '50%',
        },
      ],
    };
  };

  render() {
    return (
      <div className="custom-pie-chart">
        <IceContainer>
          <ReactEcharts option={this.getOption()} style={{ height: '500px' }} />
        </IceContainer>
      </div>
    );
  }
}
