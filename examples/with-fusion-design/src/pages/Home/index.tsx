import React from 'react';
import { Button, Calendar, Icon } from '@alifd/next';
import moment from 'moment';
import '@alifd/next/es/button/style';

moment.locale('ru');
console.log(moment().format('LL'));

const Dashboard = () => {
  return (
    <>
      <h2>icejs with fusion design</h2>
      <Icon type="alibaba" />
      <Button type="primary">Primary</Button>
      <Button type="secondary">secondary</Button>
      <Button type="normal">Normal</Button>
      <Calendar shape="card" defaultValue={moment().add(1, 'days')} />
    </>
  );
};

export default Dashboard;
