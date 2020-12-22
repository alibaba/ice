import * as path from 'path';
import Generator from './generator';
import { TEMP_PATH } from './constant';
import dev from './dev';
import { setAlias, setProjectType, setEntry, setTempDir, setRegisterMethod, setRegisterUserConfig } from './config';
import getBuildConfig from './utils/getBuildConfig';

// eslint-disable-next-line
const chalk = require('chalk');

export default (api, options) => {
  const { onHook, context, setValue } = api;
  const { command, commandArgs, userConfig } = context;
  const { targets = ['web'] } = userConfig;
  const { framework } = options;

  // Set framework field
  setValue('FRAMEWORK', framework);

  // Check target
  checkTargets(targets);

  // Set temporary directory
  // eg: .ice or .rax
  setTempDir(api, options);

  // Set project type
  // eg: ts | js
  setProjectType(api);

  // Modify default entry to src/app
  // eg: src/app.(ts|js)
  setEntry(api, options);

  // Set alias
  setAlias(api, options);

  // register config in build.json
  setRegisterUserConfig(api);

  // register api method
  const generator = initGenerator(api, { ...options, debugRuntime: commandArgs.debugRuntime });
  setRegisterMethod(api, { generator });

  // add core template for framework
  const templateRoot = path.join(__dirname, './generator/templates');
  [`./app/${framework}`, './common'].forEach((templateDir) => {
    generator.addTemplateDir(path.join(templateRoot, templateDir));
  });

  // watch src folder
  if (command === 'start') {
    dev(api, { render: generator.render });
  }

  onHook(`before.${command}.run`, async () => {
    await generator.render();
  });
};

function initGenerator(api, options) {
  const { getAllPlugin, context, log, getValue } = api;
  const { userConfig, rootDir } = context;
  const { framework, debugRuntime } = options;
  const plugins = getAllPlugin();
  const { targets = [] } = userConfig;
  const isMiniapp = targets.includes('miniapp') || targets.includes('wechat-miniprogram') || targets.includes('bytedance-microapp');
  const targetDir = getValue(TEMP_PATH);
  return new Generator({
    rootDir,
    targetDir,
    defaultData: {
      framework,
      isReact: framework === 'react',
      isRax: framework === 'rax',
      isMiniapp,
      buildConfig: JSON.stringify(getBuildConfig(userConfig)),
    },
    log,
    plugins,
    debugRuntime,
  });
}

function checkTargets(targets) {
  let hasError = false;

  if (Object.prototype.toString.call(targets) === '[object Object]') {
    hasError = true;
  }

  if (typeof targets === 'string') {
    hasError = true;
  }

  if (Array.isArray(targets) && !matchTargets(targets)) {
    hasError = true;
  }

  if (hasError) {
    const msg = `
  targets must be the array type in build.json.

    e.g. { "targets": ["miniapp", "wechat-miniprogram"] }

  if you want to describes the browserslist environments for your project.
  you should set browserslist in build.json.

    e.g. { "browserslist": { "chrome": "58", "ie": 11 } }
`;
    console.log();
    console.log(chalk.red(msg));
    console.log();
    process.exit(1);
  }
}

function matchTargets(targets) {
  return targets.every(target => {
    return ['web', 'miniapp', 'wechat-miniprogram', 'weex', 'kraken', 'bytedance-microapp', 'quickapp'].includes(target);
  });
}
