import React, { useEffect } from 'react';
import store from '@/store';

export default function() {
  const [user, login] = store.useHooks('useTodoList');

  useEffect(function() {
    login();
  }, []);

  const { name } = user;
  return (
    <div>
      Hello, {name}!
    </div>
  );
};
