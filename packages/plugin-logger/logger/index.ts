// export console to compat with `import { logger } from 'ice';`
const logger = {};
['trace', 'debug', 'info', 'warn', 'error'].forEach((level) => {
  logger[level] = console[level];
});

export default logger;