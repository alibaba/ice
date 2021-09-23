import React from 'react';
import { Link } from 'ice';
import appStore from '@/store';
import pageStore from './store';

export default () => {
  const [counterState, counterActions] = appStore.useModel('counter');
  const [titleState, titleAction] = pageStore.useModel('title');
  const [appTitleState] = appStore.useModel('title');
  let input;

  return (
    <>
      <h2>{appTitleState.title}</h2>
      <h2>{titleState.title}</h2>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        titleAction.update(input.value);
        input.value = '';
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Update Title
        </button>
      </form>
      <div style={{ marginTop: 30 }}>
        <button type="button" id="increment" onClick={counterActions.increment}>+</button>
        <span>{counterState.count}</span>
        <button type="button" id="decrement" onClick={counterActions.decrementAsync}>-</button>
      </div>
      <div>countHistory：{counterState.countHistory}</div>

      <Link to="/about">about</Link>
    </>
  );
};
