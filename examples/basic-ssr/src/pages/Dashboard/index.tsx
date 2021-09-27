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

export default Dashboard;
