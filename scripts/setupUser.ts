import { exec } from '@actions/exec';

const setupUser = async () => {
  await exec('git', [
    'config',
    'user.name',
    '"github-actions[bot]"',
  ]);
  await exec('git', [
    'config',
    'user.email',
    '"github-actions[bot]@users.noreply.github.com"',
  ]);
};

(async () => {
  await setupUser();
})();
