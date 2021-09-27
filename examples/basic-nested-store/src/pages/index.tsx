import React from 'react';
import { Link } from 'ice';

export default function Home() {
  return (
    <>
      <h2>Index Page...</h2>
      <Link to="/about">About</Link>
    </>
  );
}
