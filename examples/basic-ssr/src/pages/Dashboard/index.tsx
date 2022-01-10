import React from 'react';
import { Link } from 'ice';

const Dashboard = (props) => {
  console.info('Dashboard props', props);
  return (
    <>
      <h2>{props.title}</h2>
      <Link to="/about">about</Link>
    </>
  );
};

Dashboard.getInitialProps = async (ctx) => {
  console.log('Dashboard ctx', ctx);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: 'Dashboard Page xxxx...' });
    }, 1 * 1000);
  });
};

export default Dashboard;
