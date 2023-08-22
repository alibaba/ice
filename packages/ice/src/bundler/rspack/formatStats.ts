import chalk from 'chalk';
import formatWebpackMessages from '../../utils/formatWebpackMessages.js';
import type { Stats, MultiStats } from '../types.js';

function formatStats(stats: Stats | MultiStats, showWarnings = true) {
  const statsData = stats.toJson({
    preset: 'errors-warnings',
  });
  // @ts-ignore
  const { errors, warnings } = formatWebpackMessages(statsData);

  if (errors.length) {
    const errorMsgs = `${errors.join('\n\n')}\n`;
    const isTerserError = errorMsgs.includes('from Terser');
    const title = chalk.red.bold(
      isTerserError ? 'Minify Error: ' : 'Compile Error: ',
    );
    const tip = chalk.yellow(
      isTerserError
        ? 'Failed to minify the code with terser, please check if there are any syntax errors in the code.'
        : 'Failed to compile the code, please refer to the following errors for troubleshooting.',
    );

    return {
      message: `${title}\n${tip}\n${errorMsgs}`,
      level: 'error',
    };
  }

  // always show warnings in tty mode
  if (warnings.length && (showWarnings || process.stdout.isTTY)) {
    const title = chalk.yellow.bold('Compile Warning: \n');
    return {
      message: `${title}${`${warnings.join('\n\n')}\n`}`,
      level: 'warning',
    };
  }

  return {};
}

export default formatStats;
