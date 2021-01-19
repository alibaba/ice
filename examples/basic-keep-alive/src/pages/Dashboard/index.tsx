import React from 'react';
import { Link } from 'ice';

const { useState } = React;
const Dashboard = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>Dashboard Page...</h2>
      <div>{count}</div>
      <a onClick={() => {setCount(count + 1);}}>+</a>
      <a onClick={() => {setCount(count - 1);}}>-</a>
      <Link to="/about">About</Link>
    </>
  );
};

Dashboard.pageConfig = {
  title: 'Dashboard Page'
};

export default Dashboard;
