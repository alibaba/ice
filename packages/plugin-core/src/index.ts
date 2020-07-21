
import * as path from 'path';
import Generator from './generator';
import getRuntimeModules from './utils/getRuntimeModules';
import { ICE_TEMP } from './constant';
import dev from './dev';
import { setAlias, setProjectType, setEntry, setTempDir, setRegisterMethod, setRegisterUserConfig } from './config';

export default (api, options) => {
  const { onHook, context } = api;
  const { command } = context;

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
  return new Generator({
    rootDir,
    targetDir: getValue(ICE_TEMP),
    appTemplateDir: path.join(__dirname, `./generator/templates/app/${framework}`),
    commonTemplateDir: path.join(__dirname, './generator/templates/common'),
    defaultData: {
      framework,
      isReact: framework === 'react',
      isRax: framework === 'rax',
      isMiniapp: userConfig.miniapp,
      runtimeModules: getRuntimeModules(plugins),
      buildConfig: JSON.stringify(userConfig)
    },
    log
  });
}
