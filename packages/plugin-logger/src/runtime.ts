import logger from '$ice/logger';

const module = ({ appConfig }) => {
  if (appConfig.logger && appConfig.logger.level) {
    logger.setLevel(appConfig.logger.level);
  }
};

export default module;
