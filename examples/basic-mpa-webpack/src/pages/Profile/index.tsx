import React from 'react';
import store from './store';

const Profile = () => {
  const [pageState, pageActions] = store.useModel('counter');
  return (
    <>
      <h2>Profile Page...</h2>
      <div>
        <button type="button" onClick={pageActions.increment}>+</button>
        <span>{pageState.count}</span>
        <button type="button" onClick={pageActions.decrement}>-</button>
      </div>
    </>
  );
};

export default Profile;
