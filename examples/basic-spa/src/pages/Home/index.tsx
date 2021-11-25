import React from 'react';
import { Link, usePageShow, usePageHide, config, getInitialData } from 'ice';
import svg from '@/svg-test.svg';

console.debug('console from ice', console.debug);

console.info('=== info ===');
console.warn('=== warn ===');
console.error('=== error ===');
console.debug('=== debug ===');
console.trace('=== trace ===');

console.log('getInitialData outside=====>:', getInitialData());

export default function Home(props) {
  console.log('getInitialData inside=====>:', getInitialData());

  console.info('Home props', props);
  console.info('render home config.appId', config.appId);

  usePageShow(() => {
    console.log('page show....');
  });

  usePageHide(() => {
    console.log('page hide...');
  });

  return (
    <>
      <img src={svg} alt="logo"/>
      <h2 className="home-title">Home Page...{props.count}</h2>
      <Link to="/about">About</Link><br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
}
