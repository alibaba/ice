import React from 'react';
import { Link, helpers } from 'ice';

console.log('helpers from ice', helpers);

const Home = (props) => {
  console.log('Home props', props);
  return (
    <>
      <h2>Home Page...{props.a}</h2>
      <Link to="/about">About</Link><br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
};

export default Home;
