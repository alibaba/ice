import * as React from 'react';
import { Outlet, Link } from 'ice';

export default () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/dashboard/a">a</Link></li>
        <li><Link to="/dashboard/b">b</Link></li>
      </ul>
      <Outlet />
    </div>
  );
};