import * as React from 'react';
import { getSearchParams } from 'ice';
import store from './store';

export default function Test(props) {
  console.log('Test props', props);
  console.log('search params', getSearchParams());

  const [counterState, counterAction] = store.useModel('counter');

  return <>
    Hello: {props.name}
    <div>Count: {counterState.count}</div>
    <div onClick={counterAction.increment}>+</div>
    <div onClick={counterAction.decrement}>-</div>
  </>;
}

Test.pageConfig = {
  title: '哈哈'
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Test.getInitialProps = async (ctx) => {
  return {
    name: 'React(getInitialProps)'
  };
};
