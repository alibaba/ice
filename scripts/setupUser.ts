import { exec } from '@actions/exec';

const setupUser = async () => {
  await exec('git', [
    'config',
    'user.name',
    '"ClarkXia"',
  ]);
  await exec('git', [
    'config',
    'user.email',
    '"xiawenwu41@gmail.com"',
  ]);
};

(async () => {
  await setupUser();
})();
