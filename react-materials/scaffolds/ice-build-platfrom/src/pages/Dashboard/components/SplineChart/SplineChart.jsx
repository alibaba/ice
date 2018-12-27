/* eslint object-shorthand: 0,space-before-function-paren:0, prefer-template:0, wrap-iife:0 */
import React, { Component } from 'react';

const ReactHighcharts = require('react-highcharts');
const Highcharts = require('highcharts');

let intervalId;

const config = {
  chart: {
    type: 'spline',
    animation: Highcharts.svg,
    marginRight: 10,
    height: 240,
    events: {
      load: function() {
        // set up the updating of the chart each second
        const series = this.series[0];
        intervalId = setInterval(() => {
          const x = new Date().getTime(); // current time
          const y = Math.random();
          series.addPoint([x, y], true, true);
        }, 1000);
      },
    },
  },
  title: {
    text: '',
  },
  xAxis: {
    type: 'datetime',
    tickPixelInterval: 150,
    title: {
      text: '时间(秒)',
    },
  },
  yAxis: {
    tickInterval: 1,
    title: {
      text: '构建次数',
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: '#808080',
      },
    ],
  },
  tooltip: {
    formatter: function() {
      return (
        '<b>' +
        this.series.name +
        '</b><br/>' +
        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +
        '<br/>' +
        Highcharts.numberFormat(this.y, 2)
      );
    },
  },
  legend: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: 'Random data',
      color: '#5e83fb',
      data: (function() {
        // generate an array of random data
        const data = [];
        const time = new Date().getTime();

        let i;

        for (i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: Math.random() * (2 - 1) + 1,
          });
        }
        return data;
      })(),
    },
  ],
};

export default class SplineChart extends Component {
  static displayName = 'SplineChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  render() {
    return <ReactHighcharts config={config} />;
  }
}
