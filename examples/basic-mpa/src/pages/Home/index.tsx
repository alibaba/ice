import React from 'react';
import { useRequest } from 'ice';
import store from './store';

console.log(111, useRequest);

const Home = () => {
  const [state] = store.useModel('default');

  return (
    <>
      <h2>{state.title}</h2>
    </>
  );
};

export default () => (<store.Provider><Home /></store.Provider>);
