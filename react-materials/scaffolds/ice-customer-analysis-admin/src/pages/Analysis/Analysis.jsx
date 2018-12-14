import React, { Component } from 'react';
import UserPortrait from '../../components/UserPortrait';
import PassengerFlow from '../../components/PassengerFlow';
import TimeDistribution from '../../components/TimeDistribution';
import EventsOverview from '../../components/EventsOverview';

const mockData = [
  {
    title: '累计客流量',
    value: '100,232,234',
    ratio: '33%',
    change: 'up',
  },
  {
    title: '日均客流',
    value: '56,323',
    ratio: '22%',
    change: 'up',
  },
  {
    title: '峰值时间',
    value: '19：00 ~ 20：00',
    ratio: '11%',
    change: 'up',
  },
  {
    title: '日新增',
    value: '2,311',
    ratio: '8%',
    change: 'down',
  },
  {
    title: '月新增',
    value: '3,459',
    ratio: '10%',
    change: 'down',
  },
  {
    title: '年新增',
    value: '213,320',
    ratio: '55%',
    change: 'up',
  },
];

export default class Analysis extends Component {
  render() {
    return (
      <div>
        <EventsOverview />
        <UserPortrait />
        <PassengerFlow title="客流分析" data={mockData} />
        <TimeDistribution title="客流到访时间" />
      </div>
    );
  }
}
