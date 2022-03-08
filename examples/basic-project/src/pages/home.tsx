import * as React from 'react';
import { useAppContext } from 'ice';
import './home.css';

export default function Home() {
  const appContext = useAppContext();

  console.log('Home Page: appContext', appContext);

  return <><h2>Home Page</h2></>;
}