import React from 'react';
import { Link } from 'ice';

const Home = (props) => {
  console.log('render 404', props);

  return (
    <>
      <h2>404 Page...</h2>
      <Link to="/">home</Link><br />
      <Link to="/about">About</Link><br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
};

export default Home;
