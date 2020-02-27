import React from 'react';
import { Link } from 'ice';
import { store as pageStore } from 'ice/Counter'

const Counter = () => {
  const [pageState, pageActions] = pageStore.useModel('default')

  console.log(pageState)

  return (
    <>
      <h2>Counter Page</h2>

      <div>
        <button type="button" onClick={pageActions.increment}>+</button>
        <span>{pageState.count}</span>
        <button type="button" onClick={pageActions.decrement}>-</button>
      </div>

      <Link to="/">home</Link>
    </>
  )
};

export default Counter;
