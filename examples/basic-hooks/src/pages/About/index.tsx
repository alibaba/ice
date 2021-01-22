import React from 'react';
import store from '@/store';

export default function () {
  const [user] = store.useHooks('useUser');
  const { name } = user;
  return (
    <>
      About
      <div>
        {name}
      </div>
    </>
  );
};
