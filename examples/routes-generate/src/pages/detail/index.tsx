import React from 'react';
import { Link } from 'ice';

export default function Detail() {
  return (
    <div>
      <h2>Detail</h2>
      <ul>
        <li><Link to="/detail/join">join</Link></li>
        <li><Link to="/detail/dashboard">dashboard</Link></li>
      </ul>
    </div>
  );
}