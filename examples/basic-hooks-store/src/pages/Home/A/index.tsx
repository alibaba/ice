import React, { useEffect } from 'react';
import { Link } from 'ice';
import pageStore from '@/pages/Home/hooksStore';

export default function() {
  const [count, plusOne] = pageStore.useHooks('useCounter');

  useEffect(function() {
    plusOne();
  }, []);

  return (
    <div>
      <h4>{count}!</h4>
      <Link to="/home/b">PageB</Link>
    </div>
  );
};

