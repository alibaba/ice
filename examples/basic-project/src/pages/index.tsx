import * as React from 'react';
import { useAppContext, Link } from 'ice';
import './index.css';

export default function Home() {
  const appContext = useAppContext();

  console.log('Home Page: appContext', appContext);

  return <><h2>Home Page</h2><Link to="/about">about</Link></>;
}

Home.pageConfig = {
  auth: ['admin'],
};