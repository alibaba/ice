import React from 'react';
import { Link } from 'ice';
import pageStore from '../store';

export default () => {
  const [state] = pageStore.useModel('b');
  return (
    <>
      <h2>{state.title}</h2>
      <Link to="/home/a">PageA</Link>
      <Link to="/">Index</Link>
    </>
  );
};
