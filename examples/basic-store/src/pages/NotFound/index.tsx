import React from 'react';
import { Link } from 'ice';

const NotFound = () => {
  return (
    <>
      <h2>404 Page...</h2>
      <Link to="/">home</Link><br />
      <Link to="/about">About</Link><br />
    </>
  );
};

export { NotFound };
