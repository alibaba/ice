import React, { Component } from 'react';
import PassengerFlow from '../../components/PassengerFlow';
import UserStatChart from '../../components/UserStatChart';

export default class Conversion extends Component {
  render() {
    return (
      <div>
        <PassengerFlow title="卖品区客流分析" />
        <UserStatChart title="卖品区用户分析" />
      </div>
    );
  }
}
