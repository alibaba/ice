import React from 'react';
import { Button, Icon } from '@alifd/next';
import '@alifd/next/es/button/style';

const Dashboard = () => {
  return (
    <>
      <h2>icejs with fusion design</h2>
      <Icon type="alibaba" />
      <Button type="primary">Primary</Button>
      <Button type="secondary">secondary</Button>
      <Button type="normal">Normal</Button>
    </>
  );
};

export default Dashboard;
