import * as React from 'react';
import { Link, useData, useConfig } from 'ice';
// @ts-expect-error
import url from './ice.png';

interface Data {
  name: string;
}

export default function About() {
  const data = useData<Data>();
  const config = useConfig();

  console.log('render About', 'data', data, 'config', config);

  return (
    <>
      <h2>About Page</h2>
      <Link to="/">home</Link>
      <img src={url} height="40" width="40" />
      <span className="mark">new</span>
    </>
  );
}

export function getConfig() {
  return {
    title: 'About',
    meta: [
      {
        name: 'theme-color',
        content: '#eee',
      },
    ],
    links: [{
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      rel: 'stylesheet',
    }],
    scripts: [{
      src: 'https://cdn.jsdelivr.net/npm/lodash@2.4.1/dist/lodash.min.js',
    }],
    auth: ['admin'],
  };
}

export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'About',
      });
    }, 1 * 100);
  });
}