import React from 'react';
import store from './store';

const Home = () => {
  const [state] = store.useModel('default');

  return (
    <>
      <h2>{state.title}</h2>
    </>
  );
};

export default () => (<store.Provider><Home /></store.Provider>);
