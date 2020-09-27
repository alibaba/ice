import React from 'react';
import { Link, store as appStore } from 'ice';
import { store as pageStore } from 'ice/Home';

export default () => {
  const [counterState, counterActions] = appStore.useModel('counter');
  const [pageState] = pageStore.useModel('default');
  const [appTitleState] = appStore.useModel('title');

  return (
    <>
      <h2>{appTitleState.title}</h2>
      <h2>{pageState.title}</h2>

      <div>
        <button type="button" onClick={() => counterActions.increment()}>+</button>
        <span>{counterState.count}</span>
        <button type="button" onClick={() => counterActions.decrementAsync()}>-</button>
      </div>

      <Link to="/about">about</Link>
    </>
  );
};
