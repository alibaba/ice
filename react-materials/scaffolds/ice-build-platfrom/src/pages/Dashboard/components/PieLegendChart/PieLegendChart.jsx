/* eslint object-shorthand: 0,space-before-function-paren:0, prefer-template:0, wrap-iife:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select } from '@alifd/next';

const ReactHighcharts = require('react-highcharts');

const { Option } = Select;
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const chartConfig = {
  chart: {
    height: 300,
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      data: [
        {
          name: 'Webpack',
          y: 61.41,
          sliced: true,
          selected: true,
          color: '#5e83fb',
        },
        {
          name: 'Rollup',
          y: 11.84,
          color: '#999',
        },
        {
          name: 'Parcel',
          y: 10.26,
          color: '#333',
        },
      ],
    },
  ],
};

export default class PieLengendChart extends Component {
  state = {
    selectedValue: 'day',
    config: chartConfig,
  };

  handleChange = (value) => {
    const { config } = this.state;
    config.series[0].data[0].y = random(20, 60);
    this.setState({
      selectedValue: value,
      config,
    });
  };

  render() {
    const { selectedValue, config } = this.state;
    return (
      <IceContainer>
        <div style={styles.cardHead}>
          <h4 style={styles.cardTitle}>活跃构建器分布</h4>
          <Select
            size="large"
            defaultValue="day"
            value={selectedValue}
            onChange={this.handleChange}
          >
            <Option value="day">今日</Option>
            <Option value="yesterday">昨日</Option>
            <Option value="week">7 天</Option>
            <Option value="year">12 个月</Option>
          </Select>
        </div>
        <ReactHighcharts config={config} />
      </IceContainer>
    );
  }
}

const styles = {
  cardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 0 20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
  },
  cardTitle: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
