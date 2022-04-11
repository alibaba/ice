import * as React from 'react';
import { Link } from 'ice';

export default function About() {
  return (
    <>
      <h2>About Page</h2>
      <Link to="/">home</Link>
      <span className="mark">new</span>
    </>
  );
}

export function getPageConfig() {
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

export function getInitialData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'About',
      });
    }, 1 * 100);
  });
}