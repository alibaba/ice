import React from 'react';
import { Link } from 'ice';

const { useState } = React;
const About = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>About Page</h2>
      <div id="about-count">{count}</div>
      <a id="add" onClick={() => {setCount(count + 1);}}>+</a>
      <a id="decrease" onClick={() => {setCount(count - 1);}}>-</a>
      <Link to="/">dashboard</Link>
    </>
  );
};

export default About;