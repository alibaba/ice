import { spawnSync } from 'child_process';

export default (order: string, cwd: string) => {
  const [command, ...args] = order.split(' ');
  spawnSync(command, args, {
    stdio: 'inherit',
    cwd,
  });
};
