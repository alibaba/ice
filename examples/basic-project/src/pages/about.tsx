import * as React from 'react';
<<<<<<< HEAD
import { useAppContext } from 'ice';
import './home.css';

export default function About() {
  const appContext = useAppContext();

  console.log('About Page: appContext', appContext);

  return <><h2>About Page</h2></>;
}
=======
import { Link } from 'ice';

export default function About() {
  return <><h2>About Page</h2><Link to="/">home</Link></>;
}

About.pageConfig = {
  auth: ['guest'],
};
>>>>>>> 1d93732c... feat: router (#28)
