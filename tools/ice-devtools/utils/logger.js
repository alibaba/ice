const chalk = require('chalk');
const { format } = require('util');

/**
 * Prefix.
 */
const prefix = '[ice-devtools]';

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
exports.log = function (...args) {
  const msg = format.apply(format, args);
  console.log(chalk.white(prefix), msg);
};

/**
 * info log
 *
 * @param {String} message
 */
exports.info = function (...args) {
  const msg = format.apply(format, args);
  console.log(chalk.green(prefix), msg);
};

/**
 * debug log
 */
exports.verbose = function (...args) {
  if (process.env.LOG_LEVEL !== 'verbose') {
    return;
  }

  const msg = format.apply(format, args);
  console.log(chalk.white(prefix), msg);
};

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */
exports.fatal = function (...args) {
  console.log();
  if (args[0] instanceof Error) {
    const errorName = args[0].name ? ` ${args[0].name}:` : '';
    console.error(chalk.red(prefix + errorName + args[0].message.trim()));
    console.error(args[0]);
  } else {
    console.error(chalk.red(prefix), ...args);
  }
  console.log();
  process.exit(1);
};

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */
exports.success = function (...args) {
  const msg = format.apply(format, args);
  console.log();
  console.log(chalk.white(prefix), msg);
  console.log();
};


/**
 * Log a warn `message` to the console.
 *
 * @param {String} message
 */
exports.warn = function (...args) {
  const msg = format.apply(format, args);
  console.log();
  console.log(chalk.yellow(prefix), msg);
  console.log();
};
