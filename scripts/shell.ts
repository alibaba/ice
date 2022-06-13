import { execaCommand } from 'execa';

export async function run(command: string, options: object) {
  console.log(`[RUN]: ${command}`);
  return execaCommand(command, { stdio: 'inherit', cwd: options['cwd'] });
}
