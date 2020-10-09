import logger from '$ice/logger';

const module = ({ appConfig }) => {
  if (appConfig.logger && appConfig.logger.level) {
    logger.setLevel(appConfig.logger.level);
  } else {
    const regex = /http?s:\/\/localhost(:[0-9]+)/;
    const defaultLevel = regex.test(location.origin) ? 'DEBUG' : 'WARN';
    logger.setLevel(defaultLevel);
  }
};

export default module;
