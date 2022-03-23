import * as React from 'react';
import { Link } from 'ice';

export default function About() {
  return <><h2>About Page</h2><Link to="/">home</Link></>;
}

export function getPageConfig() {
  return {
    auth: ['guest'],
  };
}

export function getInitialData() {
  return {
    name: 'about',
  };
}