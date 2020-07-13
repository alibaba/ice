import React from 'react';
import { Link, logger } from 'ice';

const Dashboard = (props) => {
  logger.info('Dashboard props', props);
  return (
    <>
      <h2>{props.title}</h2>
      <Link to="/about">about</Link>
    </>
  );
};

Dashboard.getInitialProps = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: 'Dashboard Page xxxx...' });
    }, 1 * 1000);
  });
  // return { title: 'Dashboard Page...' }
};

export default Dashboard;
