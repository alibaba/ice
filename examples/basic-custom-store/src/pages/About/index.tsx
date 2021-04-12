import React from 'react';
import { Link } from 'ice';
import appStore from '../../store';

export default () => {
  const [counterState, counterActions] = appStore.useModel('counter');

  return (
    <>
      <h2>About</h2>

      <div>
        <button type="button" onClick={() => counterActions.increment()}>+</button>
        <span>{counterState.count}</span>
        <button type="button" onClick={() => counterActions.decrementAsync()}>-</button>
      </div>

      <Link to="/">home</Link>
    </>
  );
};
