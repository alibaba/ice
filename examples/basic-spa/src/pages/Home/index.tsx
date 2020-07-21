import React from 'react';
import { Link, usePageShow, usePageHide } from 'ice';

export default function Home(props) {
  usePageShow(() => {
    console.log('page show....');
  });

  usePageHide(() => {
    console.log('page hide...');
  });

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
