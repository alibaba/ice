import * as execa from 'execa';

export async function run(command: string) {
  console.log(`[RUN]: ${command}`);
  return execa.command(command, { stdio: 'inherit' });
}
