import React from 'react';
import { Link, usePageShow, usePageHide, helpers, logger, config, getInitialData, setInitialData } from 'ice';

logger.debug('helpers from ice', helpers.urlParse);
logger.debug('logger from ice', logger.debug);

logger.info('=== info ===');
logger.warn('=== warn ===');
logger.error('=== error ===');
logger.debug('=== debug ===');
logger.trace('=== trace ===');

console.log('getInitialData outside=====>:', getInitialData());

setInitialData({ a: 1 });

export default function Home(props) {
  console.log('getInitialData inside=====>:', getInitialData());

  logger.info('Home props', props);
  logger.info('render home config.appId', config.appId);

  usePageShow(() => {
    console.log('page show....');
  });

  usePageHide(() => {
    console.log('page hide...');
  });

  return (
    <>
      <h2>Home Page...{props.count}</h2>
      <Link to="/about">About</Link><br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
}

Home.getInitialProps = async () => {
  return { count: 1 };
};

Home.pageConfig = {
  title: 'Home Page'
};
