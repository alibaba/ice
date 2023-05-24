import * as React from 'react';
import { Link, definePageConfig } from 'ice';

export default function About() {
  return <><h2>About</h2><Link to="/">home</Link></>;
}

export const pageConfig = definePageConfig(() => ({

}));