import React from 'react';
import { Link, lazy, ErrorBoundary } from 'ice';

const Todo = lazy(() => import('./components/Todo'));
const Child = lazy(() => import('./components/Child'));

const MyFallbackComponent = () => (
  <div>
    <p><strong>Oops! An error occured!</strong></p>
    <p>Here’s what we know…</p>
  </div>
);

const About = () => {
  const myErrorHandler = (error: Error, componentStack: string) => {
    // Do something with the error
    // E.g. log to an error logging client here
    console.log({error, componentStack});
  };

  return (
    <>
      <h2>About Page</h2>
      <ErrorBoundary onError={myErrorHandler} Fallback={MyFallbackComponent}>
        <Child />
      </ErrorBoundary>
      <ErrorBoundary>
        <Todo />
      </ErrorBoundary>
      <Link to="/dashboard">dashboard</Link><br />
      <Link to="/">Home</Link>
    </>
  );
};

export default About;
