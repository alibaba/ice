import * as path from 'path';
import Generator from './generator';
import { TEMP_PATH } from './constant';
import dev from './dev';
import { setAlias, setProjectType, setEntry, setTempDir, setRegisterMethod, setRegisterUserConfig } from './config';
import getBuildConfig from './utils/getBuildConfig';

// eslint-disable-next-line
const chalk = require('chalk');
// eslint-disable-next-line
const { constants: { MINIAPP, WECHAT_MINIPROGRAM, BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM, QUICKAPP } } = require('miniapp-builder-shared');
const miniappPlatforms = [ MINIAPP, WECHAT_MINIPROGRAM, BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM ];

export default (api, options) => {
  const { onHook, context, setValue } = api;
  const { command, commandArgs, userConfig, rootDir } = context;
  const { targets = ['web'] } = userConfig;
  const { framework } = options;

  // Set framework field
  setValue('FRAMEWORK', framework);

  const hasJsxRuntime = (() => {
    try {
      // auto detect of jsx runtime
      // eslint-disable-next-line
      const tsConfig = require(path.join(rootDir, 'tsconfig.json'));
      if (tsConfig?.compilerOptions?.jsx !== 'react-jsx') {
        return false;
      }
      // ensure react/jsx-runtime
      require.resolve('react/jsx-runtime');
      return true;
    } catch (e) {
      return false;
    }
  })();
  // Set jsx runtime value
  setValue('HAS_JSX_RUNTIME', hasJsxRuntime);

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
  if (commandArgs.debugRuntime) {
    console.log('[deprecated] cli option --debug-runtime is deprecated, runtime file is generated as default');
  }
  const generator = initGenerator(api, { ...options, debugRuntime: userConfig.generateRuntime, hasJsxRuntime });
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
  const { framework, debugRuntime, hasJsxRuntime } = options;
  const plugins = getAllPlugin();
  const { targets = [], ssr = false } = userConfig;
  const isMiniapp = targets.some((target) => miniappPlatforms.includes(target));
  const targetDir = getValue(TEMP_PATH);
  return new Generator({
    rootDir,
    targetDir,
    defaultData: {
      framework,
      isReact: framework === 'react',
      isRax: framework === 'rax',
      isMiniapp,
      ssr,
      buildConfig: JSON.stringify(getBuildConfig(userConfig)),
      hasJsxRuntime,
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
    return ['web', 'weex', 'kraken', MINIAPP, WECHAT_MINIPROGRAM, BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM, QUICKAPP].includes(target);
  });
}
