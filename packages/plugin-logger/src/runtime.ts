import * as queryString from 'query-string';
import logger from '$ice/logger';

const module = ({ appConfig }) => {
  const { logger: userLogger = {} } = appConfig;

  if (userLogger.level) {
    logger.setLevel(userLogger.level);
  } else if (userLogger.smartLoglevel) {
    const searchParams: any = getSearchParams();
    if (searchParams.logLevel) {
      logger.setLevel(searchParams.logLevel);
    }
  } else if (process.env.NODE_ENV === 'development') {
    const DEV_DEFAULE_LEVEL = process.env.NODE_ENV === 'development' ? 'DEBUG' : 'WARN';
    logger.setLevel(DEV_DEFAULE_LEVEL);
  }
};

function getSearchParams() {
  let searchParams = {};
  if (location.hash) {
    searchParams = queryString.parse(location.hash.substring(2));
  } else {
    searchParams = queryString.parse(location.search);
  }
  console.log('searchParams:', searchParams);
  return searchParams;
}

export default module;
