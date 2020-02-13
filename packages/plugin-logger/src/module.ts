import logger from '$ice/logger';

const module = ({ appConfig }) => {
  const { loglevel } = appConfig;
  if (loglevel) {
    logger.setLevel(loglevel);
  }
}

export default module;
