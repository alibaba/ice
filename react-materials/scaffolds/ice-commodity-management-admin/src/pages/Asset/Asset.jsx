import React, { Component } from 'react';
import Overview from '../../components/Overview';
import PageHead from '../../components/PageHead';
import AssetTab from './components/AssetTab';

const MOCK_DATA = [
  {
    title: '可用余额(元)',
    value: '0.00',
  },
  {
    title: '待结算(元)',
    value: '0.00',
  },
  {
    title: '储值资金(元)',
    value: '0.00',
  },
];

export default class Asset extends Component {
  render() {
    return (
      <div>
        <PageHead title="资产管理" />
        <Overview data={MOCK_DATA} col="3" />
        <AssetTab />
      </div>
    );
  }
}
