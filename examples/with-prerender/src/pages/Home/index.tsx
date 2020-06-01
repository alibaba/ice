import * as React from 'react';
import { Link } from 'ice';


const Home = () => {
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
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div>Home</div>
    </>
  );
};

export default Home;
