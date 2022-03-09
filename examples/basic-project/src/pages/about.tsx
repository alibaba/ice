import * as React from 'react';
import { useAppContext } from 'ice';
import './home.css';

export default function About() {
  const appContext = useAppContext();

  console.log('About Page: appContext', appContext);

  return <><h2>About Page</h2></>;
}