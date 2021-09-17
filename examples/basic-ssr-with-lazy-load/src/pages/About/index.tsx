import React from 'react';
import { Link, Head } from 'ice';

const About = (props) => {
  console.info('About props', props);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>About</title>
        <meta name="keywords" content="About Keywords" />
        <meta name="description" content="About Description" />
      </Head>
      <h2>{props.title}</h2>
      <Link to="/">home</Link>
    </>
  );
};

export default About;
