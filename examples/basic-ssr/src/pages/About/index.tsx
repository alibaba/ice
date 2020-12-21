import React from 'react';
import { Link, logger, Helmet } from 'ice';

const About = (props) => {
  logger.info('About props', props);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
        <meta name="keywords" content="keywords" />
        <meta name="description" content="About xx" />
      </Helmet>
      <h2>{props.title}</h2>
      <Link to="/dashboard">dashboard</Link><br />
      <Link to="/">home</Link>
    </>
  );
};

About.pageConfig = {
  // title: 'About',
};

About.getInitialProps = async () => {
  return { title: 'About Page.......' };
};

export default About;
