import React from 'react';
import { Link } from 'ice';

const NotFound = () => {
  return (
    <div>
      <h2>404</h2>
      <div>
        <Link to="/">Dashboard</Link>
      </div>
    </div>
  );
};

export default NotFound;
