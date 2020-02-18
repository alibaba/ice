import React from 'react'
import { Link, useApp, helpers, logger, config } from 'ice'

logger.debug('helpers from ice', helpers.urlParse);
logger.debug('logger from ice', logger.debug);

logger.info('=== info ===');
logger.warn('=== warn ===');
logger.error('=== error ===');
logger.debug('=== debug ===');
logger.trace('=== trace ===');

const Home = (props) => {
  const app = useApp()

  logger.info('Home props', props);
  logger.info('render home app', app)
  logger.info('render home config.appId', config.appId);

  // const { data, error, loading, request: fetchRepo } = useRequest({ url: '/api/repo' })
  // logger.info('useRequest:', { data, error, loading, fetchRepo })

  // useEffect(() => {
  //   (async function () {
  //     await fetchRepo()
  //   }())
  // }, [])

  return (
    <>
      <h2>Home Page...{props.a}</h2>
      <Link to="/about">About</Link><br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
}

Home.getInitialProps = async () => {
  return {a: 1}
};

Home.pageConfig = {
  title: 'Home Page',
};

export default Home
