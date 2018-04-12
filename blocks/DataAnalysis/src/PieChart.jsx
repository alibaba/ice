import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Title from './Title';

export default class PicChart extends Component {
  static displayName = 'PicChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};

    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          type:'pie',
          radius: ['40%', '50%'],
          avoidLabelOverlap: false,
          selectedMode: 'single',
          label: {
            show: true,
            formatter: '{b}\n{d}%'
          },
          color: ['#ffc72b', '#49dff0','#f845f1','#9c6a79', '#ff4343','#0b5263']
        }
      ]
    };
  }

  render() {
    const {
      data,
      title
    } = this.props;

    this.option.series[0].data = data;
    return (
      <div>
        <Title data={title} />
        <ReactEcharts option={this.option} style={{height: '260px', margin: '0 auto'}} />
      </div>
    );
  }
}
