import consola from 'consola';
import chalk from 'chalk';
import getMiniappTask from '../../tasks/miniapp/index.js';
import { getAppExportConfig, getRouteExportConfig } from '../../service/config.js';

const plugin = ({ registerTask, onHook, context }) => {
  const { commandArgs, rootDir, command, extendsPluginAPI: { dataCache } } = context;
  const { platform } = commandArgs;
  const { getAppConfig } = getAppExportConfig(rootDir);
  const { getRoutesConfig } = getRouteExportConfig(rootDir);
  registerTask(platform, getMiniappTask({ rootDir, command, platform, getAppConfig, getRoutesConfig, dataCache }));

  onHook('after.start.compile', async ({ isSuccessful, isFirstCompile }) => {
    if (isSuccessful && isFirstCompile) {
      let logoutMessage = '\n';
      logoutMessage += chalk.green(`Use ${platform} developer tools to open the following folder:`);
      logoutMessage += `\n${chalk.underline.white(rootDir)}`;
      consola.log(`${logoutMessage}\n`);
    }
  });
};

export default plugin;
