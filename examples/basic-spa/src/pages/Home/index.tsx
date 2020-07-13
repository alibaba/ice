import React from 'react';
import { Link } from 'ice';

export default function Home(props) {
  return (
    <>
      <h2>Home Page...{props.count}</h2>
      <Link to="/about">About</Link><br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
}

Home.getInitialProps = async () => {
  return { count: 1 };
};

Home.pageConfig = {
  title: 'Home Page'
};
