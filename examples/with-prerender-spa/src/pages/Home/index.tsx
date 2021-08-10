import * as React from 'react';
import { Link } from 'ice';

const Home = ({ data = [] }) => {
  return (
    <>
      <div id="menu">
        <ul>
          <h2>icejs with prerender</h2>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/about/1">About</Link>
          </li>
          {
            data.map((item: number) => (<li key={item}><strong>{item}</strong></li>))
          }
        </ul>
      </div>
      <div>Home</div>
    </>
  );
};

export default Home;
