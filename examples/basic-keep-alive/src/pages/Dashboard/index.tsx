import React from 'react';
import { Link } from 'ice';

const { useState } = React;
const Dashboard = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>Dashboard Page...</h2>
      <div id="dashboard-count">{count}</div>
      <a id="add" onClick={() => {setCount(count + 1);}}>+</a>
      <a id="decrease" onClick={() => {setCount(count - 1);}}>-</a>
      <Link to="/about">About</Link>
    </>
  );
};

export default Dashboard;
