import React from 'react';
import { Link } from 'ice';

const { useState } = React;
const About = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>About Page</h2>
      <div>{count}</div>
      <a onClick={() => {setCount(count + 1);}}>+</a>
      <a onClick={() => {setCount(count - 1);}}>-</a>
      <Link to="/">dashboard</Link>
    </>
  );
};

export default About;