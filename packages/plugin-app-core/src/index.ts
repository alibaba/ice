import * as path from 'path';
import * as hash from 'object-hash';
import { getFrameworkTemplateDir, getCommonTemplateDir } from '@builder/app-templates';
import Generator from './generator';
import { TEMP_PATH } from './constant';
import dev from './dev';
import { setAlias, setProjectType, setEntry, setTempDir, setRegisterMethod, setRegisterUserConfig } from './config';
import getBuildConfig from './utils/getBuildConfig';

// eslint-disable-next-line
const { constants: { MINIAPP, WECHAT_MINIPROGRAM, BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM, QUICKAPP, BYTEDANCE_MICROAPP } } = require('miniapp-builder-shared');
const miniappPlatforms = [ MINIAPP, WECHAT_MINIPROGRAM, BYTEDANCE_MICROAPP, BAIDU_SMARTPROGRAM, KUAISHOU_MINIPROGRAM ];

export default (api, options) => {
  const { onHook, context, setValue } = api;
  const { command, userConfig, rootDir } = context;
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

  // Set webpack cache id
  setValue('WEBPACK_CACHE_ID', hash({ ...userConfig, hasJsxRuntime }));

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
  const generator = initGenerator(api, { ...options, hasJsxRuntime });

  setRegisterMethod(api, { generator });

  // add core template for framework
  renderDefaultTemplate(generator, { framework });

  // watch src folder
  if (command === 'start') {
    dev(api, { render: generator.render });
  }

  onHook(`before.${command}.run`, () => {
    generator.render();
  });
};

function renderDefaultTemplate(generator: Generator, { framework }) {
  const templateRoot = path.join(__dirname, './generator/templates');

  const templates = [{
    dir: getFrameworkTemplateDir(framework),
    target: 'core',
  }, {
    dir: getCommonTemplateDir(),
    target: 'core',
  }, {
    dir:  path.join(templateRoot, 'types'),
    target: 'types',
  }, {
    path: path.join(templateRoot, './index.ts.ejs'),
  }];
  templates.forEach(({ dir, target, path: filePath }) => {
    generator.addTemplateFiles({
      template: dir || filePath,
      targetDir: target || '',
    });
  });
}

function initGenerator(api, options) {
  const { getAllPlugin, context, log, getValue } = api;
  const { rootDir } = context;
  const plugins = getAllPlugin();
  const targetDir = getValue(TEMP_PATH);
  return new Generator({
    rootDir,
    targetDir,
    defaultData: getDefaultRenderData(api, options),
    log,
    plugins,
  });
}

function getDefaultRenderData(api, options) {
  const { context } = api;
  const { userConfig } = context;
  const { framework, hasJsxRuntime } = options;
  const { targets = [], ssr = false } = userConfig;
  const isMiniapp = targets.some((target: string) => miniappPlatforms.includes(target));
  const renderData = {
    framework,
    buildConfig: getBuildConfig(userConfig),
    hasJsxRuntime,
    relativeCorePath: '.',
    typesPath: '../types',
  };
  if (framework === 'rax') {
    return {
      ...renderData,
      isReact: false,
      isRax: true,
      isMiniapp,
      isMPA: false,
      tabBarPath: '', // avoid ejs error
      routesFilePath: './staticConfig',
      // MPA 下会覆盖
      enableRouter: true,
    };
  } else {
    return {
      ...renderData,
      isReact: true,
      isRax: false,
      ssr,
      // MPA 下会覆盖
      enableRouter: (!userConfig.mpa && userConfig.router !== false),
    };
  }
}
