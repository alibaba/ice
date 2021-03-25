import * as queryString from 'query-string';
// @ts-ignore
import logger from '$ice/logger';

const module = ({ appConfig }) => {
  const { logger: userLogger = {} } = appConfig;

  if (userLogger.level) {
    return logger.setLevel(userLogger.level);
  }

  let loglevel = process.env.NODE_ENV === 'development' ? 'DEBUG' : 'WARN';
  if (userLogger.smartLoglevel) {
    const searchParams: any = getSearchParams();
    if (searchParams.__loglevel__) {
      loglevel = searchParams.__loglevel__;
    }
  }
  logger.setLevel(loglevel);
};

function getSearchParams() {
  let searchParams = {};
  if (location.hash) {
    searchParams = queryString.parse(location.hash.substring(2));
  } else {
    searchParams = queryString.parse(location.search);
  }
  return searchParams;
}

export default module;
