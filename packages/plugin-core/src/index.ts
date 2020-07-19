
import * as path from 'path';
import * as fse from 'fs-extra';
import * as globby from 'globby';
import * as ejs from 'ejs';
import * as prettier from 'prettier';
import Generator from './generator';
import getRuntimeModules from './utils/getRuntimeModules';
import registerMethods from './utils/registerMethods';
import { USER_CONFIG, PROJECT_TYPE, ICE_TEMP } from './constant';
import dev from './dev';

export default (api, options) => {
  const { onHook, onGetWebpackConfig, registerUserConfig, context, getAllPlugin, setValue, modifyUserConfig, log } = api;
  const { rootDir, command, userConfig } = context;

  const { framework } = options;
  const isReact = framework === 'react';
  const isRax = framework === 'rax';

  const tempDir = isRax ? 'rax' : 'ice';
  const tempPath = path.join(rootDir, `.${tempDir}`);
  setValue(ICE_TEMP, tempPath);

  const tsEntryFiles = globby.sync(['src/app.@(ts?(x))', 'src/pages/*/app.@(ts?(x))'], { cwd: rootDir });
  const projectType = tsEntryFiles.length ? 'ts' : 'js';
  setValue(PROJECT_TYPE, projectType);

  fse.ensureDirSync(tempPath);
  fse.emptyDirSync(tempPath);

  // get runtime module
  const plugins = getAllPlugin();
  const runtimeModules = getRuntimeModules(plugins);

  // modify default entry to src/app
  if (!userConfig.entry) {
    modifyUserConfig('entry', 'src/app');
  }

  onGetWebpackConfig((config: any) => {
    const aliasKey = framework === 'rax' ? 'raxapp' : 'ice';
    const aliasMap = [
      [`${aliasKey}$`, path.join(tempPath, 'index.ts')],
      [`${aliasKey}`, path.join(tempPath, 'pages') ],
      ['@', path.join(rootDir, 'src')]
    ];

    aliasMap.forEach(alias => config.resolve.alias.set(alias[0], alias[1]));
  });

  const miniapp = userConfig.miniapp && userConfig.miniapp.buildType === 'runtime';
  const appJsonConfig = globby.sync(['src/app.json'], { cwd: rootDir });
  const generator = new Generator({
    rootDir,
    targetDir: tempPath,
    appTemplateDir: path.join(__dirname, `./generator/templates/app/${framework}`),
    commonTemplateDir: path.join(__dirname, './generator/templates/common'),
    defaultData: {
      isReact,
      isRax,
      miniapp,
      runtimeModules,
      buildConfig: JSON.stringify(userConfig),
      appJsonConfig: appJsonConfig.length && appJsonConfig[0]
    },
    log
  });

  async function render() {
    await generator.render();
  }

  // register config in build.json
  USER_CONFIG.forEach(item => registerUserConfig({ ...item }));

  // register api method
  registerMethods(api, { generator });

  // watch src folder
  if (command === 'start') {
    dev(api, { render, generator });
  }

  onHook(`before.${command}.run`, async () => {
    await render();
  });
};
