import React from 'react';
import { Link } from 'ice';

const Child = () => {
  return (
    <div>
      Child
    </div>
  );
};

const About = () => {
  return (
    <>
      <h2>About Page</h2>
      <Child />
      <Link to="/dashboard">dashboard</Link><br />
      <Link to="/">Home</Link>
    </>
  );
};

export default About;
