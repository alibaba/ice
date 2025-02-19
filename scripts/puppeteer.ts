import { exec } from '@actions/exec';

const installPuppeteer = async () => {
  await exec('node', [
    require.resolve('puppeteer/install.js'),
  ]);
};

(async () => {
  await installPuppeteer();
})();
