import path from 'path';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import spawn from 'cross-spawn';
import ejs from 'ejs';
import transformBuild from './transformBuild.js';
import mergePackage from './mergePackage.js';
import moveFiles from './moveFiles.js';
import transformAppJson from './transformApp.js';
import type { RaxAppConfig } from './transformBuild';
import type { RaxAppJson } from './transformApp.js';

interface TransfromOptions {
  rootDir: string;
  projcetName: string;
  raxProjectName: string;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function transform(options: TransfromOptions) {
  const iceProjectDir = path.resolve(process.cwd(), options.projcetName);
  const raxProjectDir = path.resolve(process.cwd(), options.raxProjectName);

  // Init ice project.
  spawn.sync('npx', ['create-ice', options.projcetName, '--template', '@ice/lite-scaffold'], {
    stdio: 'inherit',
  });


  // Remove default src.
  spawn.sync('rm', ['-rf', 'src'], {
    cwd: iceProjectDir,
    stdio: 'inherit',
  });


  // Copy src of rax project to ice project.
  spawn.sync('cp',
    [
      '-r',
      path.join(raxProjectDir, './src'),
      path.join(iceProjectDir, './src'),
    ], {
    stdio: 'inherit',
  });


  // Transform app.js/app.ts to app.tsx.
  let appStr = '';
  const appJsPath = path.join(raxProjectDir, './src/app.js');
  const appTsPath = path.join(raxProjectDir, './src/app.ts');
  if (fse.existsSync(appJsPath)) {
    appStr = fse.readFileSync(appJsPath, 'utf-8');
    // Delete app.js of ice project.
    spawn.sync('rm', ['-rf', path.join(iceProjectDir, './src/app.js')], { stdio: 'inherit' });
  } else if (fse.existsSync(appTsPath)) {
    appStr = fse.readFileSync(appTsPath, 'utf-8');
    // Delete app.ts of ice project.
    spawn.sync('rm', ['-rf', path.join(iceProjectDir, './src/app.ts')], { stdio: 'inherit' });
  }
  let iceAppStr = appStr.replace(/runApp/g, 'defineAppConfig').replace(/rax-app/g, 'ice');
  iceAppStr += 'export default defineAppConfig;';
  fse.writeFileSync(path.join(iceProjectDir, './src/app.tsx'), iceAppStr);


  // Init document.
  const documentStr = fse.readFileSync(path.join(__dirname, '../templates/document.tsx'), 'utf-8');
  fse.writeFileSync(path.join(iceProjectDir, './src/document.tsx'), documentStr);


  // Copy plugins.
  spawn.sync('cp',
    [
      '-r',
      path.join(__dirname, '../plugins'),
      path.join(iceProjectDir, './'),
    ], {
    stdio: 'inherit',
  });


  // Transform build.json to ice.config.mts.
  const buildJson: RaxAppConfig = await fse.readJSON(path.join(raxProjectDir, './build.json'));
  const {
    config,
    iceConfig,
  } = await transformBuild(buildJson);

  // Transform app.json
  const appJson: RaxAppJson = await fse.readJSON(path.join(raxProjectDir, './src/app.json'));
  const { routeConfig } = await transformAppJson(appJson);

  const {
    webpackPlugins,
    webpackLoaders,
    babelPlugins,
    babelPresets,
    postcssrc,
    postcssOptions,
    cssLoaderOptions,
    lessLoaderOptions,
    sassLoaderOptions,
    devServer,
  } = config;

  async function createExtraPugin({
    templateName = '',
    outputFilename = '',
    options = {},
  }) {
    const str = await ejs.render(
      fse.readFileSync(
        path.join(__dirname, `../templates/${templateName}.ejs`),
        'utf-8',
      ), options,
    );

    outputFilename = outputFilename || templateName;
    fse.writeFileSync(path.join(iceProjectDir, 'plugins', `./${outputFilename}.js`), str);
    config.extraPlugins.push(`./plugins/${outputFilename}.js`);
  }

  // Deal with custom webpack plugins.
  if (webpackPlugins) {
    await createExtraPugin({
      templateName: 'plugin-webpack-plugins',
      options: { webpackPlugins },
    });
  }

  // Deal with custom webpack loaders.
  if (webpackLoaders) {
    await createExtraPugin({
      templateName: 'plugin-webpack-loaders',
      options: { webpackLoaders },
    });
  }

  // Deal with custom babel loaders.
  if (babelPlugins || babelPresets) {
    await createExtraPugin({
      templateName: 'plugin-babel-loaders',
      options: { babelPlugins, babelPresets },
    });
  }

  // Deal with custom postcss options.
  if (postcssOptions || postcssrc) {
    await createExtraPugin({
      templateName: 'plugin-postcss',
      options: { postcssrc: postcssrc === undefined ? false : postcssrc, postcssOptions },
    });
  }

  // Deal with custom css loader options.
  if (cssLoaderOptions) {
    await createExtraPugin({
      templateName: 'plugin-general-loaders',
      outputFilename: 'plugin-css-loader',
      options: { loaderName: 'plugin-css-loader', loaderOptions: cssLoaderOptions },
    });
  }

  // Deal with custom less loader options.
  if (lessLoaderOptions) {
    await createExtraPugin({
      templateName: 'plugin-general-loaders',
      outputFilename: 'plugin-less-loader',
      options: { loaderName: 'plugin-less-loader', loaderOptions: lessLoaderOptions },
    });
  }

  // Deal with custom sass loader options.
  if (sassLoaderOptions) {
    await createExtraPugin({
      templateName: 'plugin-general-loaders',
      outputFilename: 'plugin-sass-loader',
      options: { loaderName: 'plugin-sass-loader', loaderOptions: sassLoaderOptions },
    });
  }

  if (devServer) {
    await createExtraPugin({
      templateName: 'plugin-dev-server',
      options: { devServer },
    });
  }

  const iceConfigStr = await ejs.render(fse.readFileSync(path.join(__dirname, '../templates/ice.config.mts.ejs'), 'utf-8'), {
    extraPlugins: config.extraPlugins,
    iceConfig,
    compatRaxConfig: {
      inlineStyle: !!config.inlineStyle,
    },
    routeConfig,
  });
  fse.writeFileSync(path.join(iceProjectDir, './ice.config.mts'), iceConfigStr);


  if (config.browsersListRc) {
    fse.writeFileSync(path.join(iceProjectDir, './.browserslistrc'), config.browsersListRc);
  }


  // Merge package.json.
  const raxPkg = await fse.readJSON(path.join(raxProjectDir, './package.json'));
  const icePkg = await fse.readJSON(path.join(iceProjectDir, './package.json'));
  const mergePkg = await mergePackage(raxPkg, icePkg);
  // Delete rax-app、plugin and etc.
  for (const key of Object.keys(Object.assign(mergePkg['devDependencies'], mergePkg['dependencies']))) {
    if (key.includes('rax-app')) {
      delete mergePkg['devDependencies'][key];
    }
  }

  const devDependencies = mergePkg['devDependencies'] || {};
  config.extraPlugins.forEach((extraPlugin: string) => {
    if (!devDependencies[extraPlugin]) {
      devDependencies[extraPlugin] = 'latest';
    }
  });
  fse.writeJson(path.join(iceProjectDir, './package.json'), mergePkg, { spaces: '\t' });


  // Move other files such as tsconfig and etc...
  await moveFiles(raxProjectDir, iceProjectDir);
}
