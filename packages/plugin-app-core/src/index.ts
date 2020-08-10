
import * as path from 'path';
import Generator from './generator';
import getRuntimeModules from './utils/getRuntimeModules';
import { ICE_TEMP } from './constant';
import dev from './dev';
import { setAlias, setProjectType, setEntry, setTempDir, setRegisterMethod, setRegisterUserConfig } from './config';

// eslint-disable-next-line
const chalk = require('chalk');

export default (api, options) => {
  const { onHook, context } = api;
  const { command, userConfig } = context;
  const { targets } = userConfig;

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
  const generator = initGenerator(api, options);
  setRegisterMethod(api, { generator });

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
  const { framework } = options;
  const plugins = getAllPlugin();
  const templatesDir = path.join(__dirname, './generator/templates');
  const { targets = [] } = userConfig;
  const isMiniapp = targets.includes('miniapp') || targets.includes('wechat-miniprogram');
  const srcDir = path.dirname(userConfig.entry);
  return new Generator({
    rootDir,
    targetDir: getValue(ICE_TEMP),
    templatesDir,
    appTemplateDir: path.join(templatesDir, `./app/${framework}`),
    commonTemplateDir: path.join(templatesDir, './common'),
    defaultData: {
      framework,
      isReact: framework === 'react',
      isRax: framework === 'rax',
      isMiniapp,
      runtimeModules: getRuntimeModules(plugins),
      buildConfig: JSON.stringify(userConfig)
    },
    log,
    srcDir
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

    e.g. { "browserlist": { "chrome": "58", "ie": 11 } }
`;
    console.log();
    console.log(chalk.red(msg));
    console.log();
    process.exit(1);
  }
}

function matchTargets(targets) {
  return targets.every(target => {
    return ['web', 'miniapp', 'wechat-miniprogram'].includes(target);
  });
}
