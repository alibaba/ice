import React, { useEffect } from 'react';
import hooksStore from '@/hooksStore';

export default function() {
  const [user, login] = hooksStore.useHooks('useUser');

  useEffect(function() {
    login();
    // eslint-disable-next-line
  }, []);

  const { name } = user;
  return (
    <div>
      Hello, {name}!
    </div>
  );
};
