import logger from '$ice/logger';

const module = ({ appConfig }) => {
  const LOCALHOST_URL_REGEXP = /^https?:\/\/\w+(\.\w+)*(:[0-9]+)/;
  const IP_URL_REGEXP = /^https?:\/\/(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]){2}/;
  const DEFAULE_LEVEL = LOCALHOST_URL_REGEXP.test(location.origin) || IP_URL_REGEXP.test(location.origin) ? 'DEBUG' : 'WARN';

  if (appConfig.logger && appConfig.logger.level) {
    logger.setLevel(appConfig.logger.level || DEFAULE_LEVEL);
  }
};

export default module;
