import * as React from 'react';
import { Link } from 'ice';

export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <ul>
        <li><Link to="/about-me">about</Link></li>
        <li><Link to="/detail">detail</Link></li>
        <li><Link to="/dashboard">dashboard</Link></li>
      </ul>
    </>
  );
}
