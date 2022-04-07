import { ITaskConfig, Context } from 'build-scripts';
import chalk from 'chalk';
import { ViteDevServer, createServer } from 'vite';
import { wp2vite } from './wp2vite';

type StartResult = void | ITaskConfig[] | ViteDevServer;

export async function viteStart(context: Context): Promise<StartResult> {
  const { applyHook, command, commandArgs } = context;

  const configArr = context.getWebpackConfig();
  const devConfig = configArr.length > 0 ? wp2vite(context) : {};
  await applyHook(`before.${command}.load`, {
    args: commandArgs,
    webpackConfig: configArr,
    viteConfig: devConfig,
  });

  if (!configArr.length) {
    const errorMsg = 'No config found.';
    await applyHook('error', { err: new Error(errorMsg) });
    return;
  }

  await applyHook(`before.${command}.run`, {
    args: commandArgs,
    config: devConfig,
  });

  try {
    const devServer = await createServer(devConfig);

    await devServer.listen();

    applyHook(`after.${command}.devServer`, {
      devServer,
      url: generateDevServerUrl(devConfig),
    });

    devServer.printUrls();

    return devServer;
  } catch (err) {
    console.error('Vite', chalk.red('Failed to start vite server.'));
    await applyHook('error', { err });
    throw err;
  }
}

function generateDevServerUrl(devConfig) {
  const { server: { port, https, host } } = devConfig;
  const protocol = https ? 'https' : 'http';
  return `${protocol}://${resolveHostname(host)}:${port}/`;
}

// Reference: https://github.com/vitejs/vite/blob/7e3e84e1b733f4cb0cba3bd69f28a5671b52261c/packages/vite/src/node/utils.ts#L580
function resolveHostname(host: string) {
  if (host === '0.0.0.0' || host === '::' || host === '127.0.0.1') {
    return 'localhost';
  }
  return host;
}