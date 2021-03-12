import React, { useEffect } from 'react';
import { Link } from 'ice';
import pageStore from '@/pages/Home/store';

export default function() {
  const [title, sayHello] = pageStore.useHooks('useA');

  useEffect(function() {
    sayHello();
  }, []);

  return (
    <div>
      <h4>{title}!</h4>
      <Link to="/home/b">PageB</Link>
    </div>
  );
};

