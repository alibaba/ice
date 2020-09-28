import React from 'react';
import { Link } from 'ice';
import pageStore from '../store';

export default () => {
  const [state] = pageStore.useModel('a');
  return (
    <>
      <h2>{state.title}</h2>
      <Link to="/home/b">PageB</Link>
    </>
  );
};
