import React from 'react'
import { Link, useApp } from 'ice'

const Home = (props) => {
  const app = useApp()
  console.log('render home', props, app);

  return (
    <>
      <h2>404040404 Page...</h2>
      <Link to="/">home</Link><br />
      <Link to="/about">About</Link><br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
}

export default Home
