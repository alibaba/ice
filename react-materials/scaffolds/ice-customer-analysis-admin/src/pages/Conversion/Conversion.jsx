import React, { Component } from 'react';
import PassengerFlow from '../../components/PassengerFlow';
import TimeDistribution from '../../components/TimeDistribution';

const mockData = [
  {
    title: '卖品区总客流量',
    value: '233,495',
    ratio: '66%',
    change: 'up',
  },
  {
    title: '卖品区日均客流',
    value: '4,592',
    ratio: '22%',
    change: 'down',
  },
  {
    title: '平均停留时长',
    value: '0.8h',
    ratio: '10%',
    change: 'up',
  },
];

export default class Conversion extends Component {
  static displayName = 'Conversion';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PassengerFlow title="卖品区客流分析" data={mockData} />
        <TimeDistribution title="客流到访时间分析" />
      </div>
    );
  }
}
