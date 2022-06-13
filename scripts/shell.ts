import { execaCommand } from 'execa';

export async function run(command: string, options: object) {
  const cwd = options['cwd'] ?? process.cwd();
  console.log(`[RUN]: ${command} in ${cwd}`);
  return execaCommand(command, { stdio: 'inherit', cwd });
}
