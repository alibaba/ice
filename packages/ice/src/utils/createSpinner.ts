import ora from '@ice/bundles/compiled/ora/index.js';

export default function createSpinner(
  text: string,
  options: ora.Options = {},
) {
  const spinner = ora({
    text,
    stream: process.stdout,
    isEnabled: process.stdout.isTTY,
    interval: 200,
    ...options,
  });
  spinner.start();
  return spinner;
}