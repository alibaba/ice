import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import IceContainer from '@icedesign/container';

export default class PieHalfRoseChart extends Component {
  static displayName = 'PieHalfRoseChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  getOption = () => {
    return {
      backgroundColor: '#fff',
      calculable: true,
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}千万元',
      },
      title: {
        text: '南丁格尔玫瑰图--PieHalfRose',
        left: 'center',
        top: 10,
        textStyle: {
          color: '#666',
        },
      },
      legend: {
        icon: 'circle',
        x: 'center',
        y: '15%',
        data: [
          '义乌市1',
          '义乌市2',
          '义乌市3',
          '义乌市4',
          '义乌市5',
          '义乌市6',
          '义乌市7',
          '义乌市8',
          '义乌市9',
        ],
        textStyle: {
          color: '#666',
        },
      },
      series: [
        {
          name: '销售额',
          type: 'pie',
          radius: [37, 155],
          avoidLabelOverlap: false,
          startAngle: 0,
          center: ['50%', '34%'],
          roseType: 'area',
          selectedMode: 'single',
          label: {
            normal: {
              show: true,
              formatter: '{c}千万元',
            },
            emphasis: {
              show: true,
            },
          },
          labelLine: {
            normal: {
              show: true,
              smooth: false,
              length: 20,
              length2: 10,
            },
            emphasis: {
              show: true,
            },
          },
          data: [
            {
              value: 600.58,
              name: '义乌市1',
              itemStyle: {
                normal: {
                  color: '#5484f7',
                },
              },
            },
            {
              value: 1100.58,
              name: '义乌市2',
              itemStyle: {
                normal: {
                  color: '#fbd856',
                },
              },
            },
            {
              value: 1200.58,
              name: '义乌市3',
              itemStyle: {
                normal: {
                  color: '#40ca9b',
                },
              },
            },
            {
              value: 1300.58,
              name: '义乌市4',
              itemStyle: {
                normal: {
                  color: '#f66f70',
                },
              },
            },
            {
              value: 1400.58,
              name: '义乌市5',
              itemStyle: {
                normal: {
                  color: '#00bbd3',
                },
              },
            },
            {
              value: 1500.58,
              name: '义乌市6',
              itemStyle: {
                normal: {
                  color: '#999999',
                },
              },
            },
            {
              value: 1500.58,
              name: '义乌市7',
              itemStyle: {
                normal: {
                  color: '#666666',
                },
              },
            },
            {
              value: 1600.58,
              name: '义乌市8',
              itemStyle: {
                normal: {
                  color: '#3ebbd3',
                },
              },
            },
            {
              value: 1800,
              name: '义乌市9',
              itemStyle: {
                normal: {
                  color: '#4d6bee',
                },
              },
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                },
              },
            },
          ],
        },
      ],
    };
  };

  render() {
    return (
      <div className="pie-half-rose-chart">
        <IceContainer>
          <ReactEcharts option={this.getOption()} style={{ height: '350px' }} />
        </IceContainer>
      </div>
    );
  }
}
