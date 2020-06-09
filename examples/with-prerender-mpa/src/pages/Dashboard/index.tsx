import * as React from 'react';
import { store } from 'ice/Dashboard';

const Dashboard = () => {
  const [pageState, pageActions] = store.useModel('counter');
  return (
    <>
      <h2>Dashboard Page...</h2>
      <div>
        <button type="button" onClick={pageActions.increment}>+</button>
        <span>{pageState.count}</span>
        <button type="button" onClick={pageActions.decrement}>-</button>
      </div>
    </>
  );
};

export default Dashboard;
