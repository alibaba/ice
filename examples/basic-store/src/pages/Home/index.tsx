import React from 'react';
import { Link, store as appStore } from 'ice';
import { store as pageStore } from 'ice/Home';
import Todo from './components/Todo';
import List from './components/List';

const Home = () => {
  const [counterState, counterActions] = appStore.useModel('counter');
  const [pageState] = pageStore.useModel('default');

  return (
    <>
      <h2>{pageState.title}</h2>

      <div>
        <button type="button" onClick={counterActions.increment}>+</button>
        <span>{counterState.count}</span>
        <button type="button" onClick={counterActions.decrementAsync}>-</button>
      </div>

      <Todo />
      <List />

      <Link to="/about">about</Link>
    </>
  );
};

export default Home;
