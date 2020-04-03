import React from 'react';
import { Link, lazy } from 'ice';

const Child = lazy(() => import('./components/Child'));

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
