import { execaCommand } from 'execa';

export async function run(command: string) {
  console.log(`[RUN]: ${command}`);
  return execaCommand(command, { stdio: 'inherit' });
}
