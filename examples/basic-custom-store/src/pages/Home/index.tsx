import React from 'react';
import { Link } from 'ice';
import appStore from '../../store';
import store from './store';

export default () => {
  const [counterState, counterActions] = appStore.useModel('counter');
  const [todoState, todoActions] = store.useModel('todo');
  let input;

  return (
    <>
      <h2>HOME</h2>

      <div style={{marginTop: 20}}>
        <button type="button" onClick={() => counterActions.increment()}>+</button>
        <span>{counterState.count}</span>
        <button type="button" onClick={() => counterActions.decrementAsync()}>-</button>
      </div>

      <form
        style={{marginTop: 20}}
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          todoActions.add(input.value);
          input.value = '';
        }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add todo
        </button>
      </form>
      <ul style={{marginTop: 20}}>
        {
          todoState.todos.map(todo => (
            <li>{todo}</li>
          ))
        }
      </ul>

      <Link to="/about">about</Link>
    </>
  );
};
