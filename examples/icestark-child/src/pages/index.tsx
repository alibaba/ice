import React from 'react';
import { Link } from 'ice';

const Home = (props) => {
  return (
    <>
      <h2>Home Page...{props.a}</h2>
      <Link to="/about">About</Link><br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
};

Home.getInitialProps = async () => {
  return { a: 1 };
};

Home.pageConfig = {
  title: 'Home Page'
};

export default Home;
