import React from 'react';
import { Link, logger } from 'ice';

const Home = (props) => {
  logger.info('render 404', props);

  return (
    <>
      <h2>404 Page...</h2>
      <Link to="/">home</Link><br />
      <Link to="/about">about</Link><br />
      <Link to="/dashboard">dashboard</Link>
    </>
  );
};

export default Home;
