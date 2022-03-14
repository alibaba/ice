import React from 'react';
import { Link } from 'ice';

const NotFound = (props) => {
  console.info('render 404', props);

  return (
    <>
      <h2>404 Page...</h2>
      <Link to="/">home</Link><br />
      <Link to="/about">about</Link><br />
      <Link to="/dashboard">dashboard</Link>
    </>
  );
};

export default NotFound;
