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
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      grid: {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true,
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '50%'],
          avoidLabelOverlap: false,
          selectedMode: 'single',
          label: {
            show: true,
            formatter: '{b}\n{d}%',
          },
          color: ['#5e83fb', '#f7da47', '#58ca9a', '#ee706d', '#666', '#999'],
        },
      ],
    };
  }

  render() {
    const { data, title } = this.props;

    this.option.series[0].data = data;
    return (
      <div style={{ height: '33%' }}>
        <Title data={title} />
        <ReactEcharts option={this.option} style={{ height: '100%' }} />
      </div>
    );
  }
}
