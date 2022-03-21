import * as React from 'react';
import { Link } from 'ice';
import './index.css';

export default function Home() {
  // const appContext = useAppContext();

  // console.log('Home Page: appContext', appContext);
  return <><h2>Home Page</h2><Link to="/about">about</Link></>;
}

export function getPageConfig() {
  return {
    scripts: [
      { src: 'https://g.alicdn.com/alilog/mlog/aplus_v2.js', block: true },
    ],
  };
}

Home.pageConfig = {
  auth: ['admin'],
};