const { webpackStart, webpackBuild, jestTest, Context } = require('build-scripts');
const { viteStart, viteBuild } = require('@builder/vite-service');

class BuildService extends Context {
  getCommandModule(options) {
    const { userConfig, command } = options;
    const availableCommands = ['start', 'build', 'test'];
    if (!availableCommands.includes(command)) {
      throw new Error(`command ${command} is not support`);
    }
    if (command === 'test') {
      return jestTest;
    } else if (!userConfig.vite) {
      return command === 'start' ? webpackStart : webpackBuild;
    } else {
      return command === 'start' ? viteStart : viteBuild;
    }
  }
}

module.exports = BuildService;
