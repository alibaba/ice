import React, { useEffect } from 'react';
import store from '@/store';
import { Link } from 'ice';

export default function () {
  const [user, login] = store.useHooks('useUser');

  useEffect(function () {
    login();
    // eslint-disable-next-line
  }, []);

  const { name } = user;
  return (
    <div>
      <p>Hello, {name}!</p>
      <Link to="/home/a">PageA</Link>
    </div>
  );
};