// export console to compat with `import { logger } from 'ice';`
const logger = {
  trace: console.trace,
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

export default logger;