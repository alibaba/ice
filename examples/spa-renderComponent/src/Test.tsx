import * as React from 'react';
import store from './store';

export default function Test(props) {
  console.log('Test props', props);
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

Test.getInitialProps = async (ctx) => {
  return {
    name: 'React(getInitialProps)'
  };
};
