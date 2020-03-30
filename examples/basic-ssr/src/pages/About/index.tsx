import React from 'react';
import { Link, logger } from 'ice';

const About = (props) => {
  logger.info('About props', props);
  return (
    <>
      <h2>{props.title}</h2>
      <Link to="/dashboard">dashboard</Link><br />
      <Link to="/">home</Link>
    </>
  );
};

About.getInitialProps = async () => {
  return { title: 'About Page...' };
};

export default About;
