import React from 'react';
import { Link } from 'ice';
import pageStore from '@/pages/Home/hooksStore';

export default function() {
  const [title] = pageStore.useHooks('useTitle');

  return (
    <div>
      <h4>{title}!</h4>
      <Link to="/home/a">PageA</Link>
      <br />
      <Link to="/">Index</Link>
    </div>
  );
};

