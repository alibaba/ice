import React from 'react';
import { Button, Calendar } from '@alifd/next';
import moment from 'moment';

moment.locale('ru');
console.log(moment().format('LL'));

const Dashboard = () => {
  return (
    <>
      <h2>icejs with fusion design</h2>
      <Button type="primary">Primary</Button>
      <Button type="secondary">secondary</Button>
      <Button type="normal">Normal</Button>
      <Calendar shape="card" defaultValue={moment().add(1, 'days')} />
    </>
  );
};

export default Dashboard;
