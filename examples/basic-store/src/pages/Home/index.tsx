import React from 'react';
import { Link, store as appStore } from 'ice';
import { store as pageStore } from 'ice/Home';

export default () => {
  const [counterState, counterActions] = appStore.useModel('counter');
  const [toggleState, toggleAction] = pageStore.useModel('toggle');
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
      <div
        style={{
          textDecoration: toggleState.done ? 'line-through' : 'none',
        }}
        onClick={() => toggleAction.update()}
      >
          Toggle Title
      </div>
      <div style={{ marginTop: 30 }}>
        <button type="button" onClick={counterActions.increment}>+</button>
        <span>{counterState.count}</span>
        <button type="button" onClick={counterActions.decrementAsync}>-</button>
      </div>

      <Link to="/about">about</Link>
    </>
  );
};
