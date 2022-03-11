import * as React from 'react';
import { Link } from 'ice';

export default function About() {
  return <><h2>About Page</h2><Link to="/">home</Link></>;
}

About.pageConfig = {
  auth: ['guest'],
};