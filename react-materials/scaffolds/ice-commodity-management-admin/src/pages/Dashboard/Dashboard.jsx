import React, { Component } from 'react';
import Overview from '../../components/Overview';
import QuickNav from './components/QuickNav';
import SalesChart from './components/SalesChart';
import RevenueChart from './components/RevenueChart';
import ReserveChart from './components/ReserveChart';
import PaymentChart from './components/PaymentChart';
import data from './data';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <SalesChart />
        <RevenueChart />
        <Overview data={data.data0} />
        <Overview data={data.data1} />
        <QuickNav />
        <ReserveChart />
        <PaymentChart />
        <Overview data={data.data2} />
        <Overview data={data.data3} col={2} />
        <Overview title="汇总数据" data={data.data4} />
      </div>
    );
  }
}
