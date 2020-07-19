
import * as path from 'path';
import * as fse from 'fs-extra';
import * as globby from 'globby';
import * as ejs from 'ejs';
import * as prettier from 'prettier';
import Generator from './generator/appGenerator';
import PageGenerator from './generator/pageGenerator';
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
  renderFiles(
    path.join(__dirname, './generator/templates/common'),
    path.join(tempPath, 'common'),
    {
      pageExports: '',
      pageImports: '',
      runtimeModules,
      isReact,
      isRax,
      appJsonConfig: appJsonConfig.length && appJsonConfig[0],
      miniapp
    }
  );

  const generator = new Generator({
    projectRoot: rootDir,
    targetDir: tempPath,
    templateDir: path.join(__dirname, `./generator/templates/app/${framework}`),
    defaultData: {
      isReact,
      isRax,
      miniapp,
      runtimeModules,
      buildConfig: JSON.stringify(userConfig)
    },
    log
  });

  const pageGenerator = new PageGenerator({
    rootDir,
    generator,
    templatePath: path.join(__dirname, './generator/templates/common/page.ts.ejs'),
    targetPath: tempPath,
  });

  async function renderIce() {
    pageGenerator.render();
    await generator.render();
  }

  // register config in build.json
  USER_CONFIG.forEach(item => registerUserConfig({ ...item }));

  // register api method
  registerMethods(api, { generator, pageGenerator });

  // watch src folder
  if (command === 'start') {
    dev(api, { renderIce, generator });
  }

  onHook(`before.${command}.run`, async () => {
    await renderIce();
  });
};

async function renderFiles(templateDir, targetDir, extraData) {
  const ejsTemplates = await globby(['**/*'], { cwd: templateDir });
  ejsTemplates.forEach((template) => {
    const templatePath = path.join(templateDir, template);
    const targetPath = path.join(targetDir, template);
    const renderExt = '.ejs';
    if (path.extname(template) === renderExt) {
      renderFile(templatePath, targetPath.replace(renderExt, ''), extraData);
    } else {
      fse.ensureDirSync(path.dirname(targetPath));
      fse.copyFileSync(templatePath, targetPath);
    }
  });
}

function renderFile (templatePath, targetPath, extraData = {}) {
  const templateContent = fse.readFileSync(templatePath, 'utf-8');
  let content = ejs.render(templateContent, { ...extraData });
  try {
    content = prettier.format(content, {
      parser: 'typescript',
      singleQuote: true
    });
  } catch (error) {
    //
  }
  fse.ensureDirSync(path.dirname(targetPath));
  fse.writeFileSync(targetPath, content, 'utf-8');
}
