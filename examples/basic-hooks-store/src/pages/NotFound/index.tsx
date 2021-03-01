import React from 'react';
import { Link } from 'ice';

export default function() {
  return (
    <div>
      <h2>404 Page...</h2>
      <Link to="/">Home</Link><br />
      <Link to="/todoList">Todo List</Link><br />
    </div>
  );
};
