import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h2>Home Page</h2>
      <Link to="/about">About</Link><br />
    </>
  );
}
