import React from 'react';
import { store as appStore } from 'ice';
import store from './store';

import './index.css';

export default function Home(props) {
  const { history } = props;
  const [state, dispatchers] = store.useModel('counter');
  const [appState, appDispatchers] = appStore.useModel('counter');
  return (
    <div className="home">
      <p className="title">Welcome to ICE!!!</p>
      <p className="info" onClick={appDispatchers.increment}>App Count: {appState.count}</p>
      <p className="info" onClick={dispatchers.increment}>Home Count: {state.count}</p>
      <p className="info" onClick={() => history.push('/about')}>Go About</p>
    </div>
  );
}
