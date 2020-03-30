import * as path from 'path';
import * as fse from 'fs-extra';
import * as chokidar from 'chokidar';
import * as globby from 'globby';
import Generator from './generator';
import PageGenerator from './generator/pageGenerator';
import getPages from './utils/getPages';
import formatPath from './utils/formatPath';

export default (api) => {
  const { onHook, onGetWebpackConfig, registerMethod, registerUserConfig, context, getAllPlugin, setValue, modifyUserConfig } = api;
  const { rootDir, command, userConfig } = context;

  const iceTempPath = path.join(rootDir, '.ice');
  setValue('ICE_TEMP', iceTempPath);
  const tsEntryFiles = globby.sync(['src/app.@(ts?(x))'], { cwd: rootDir });
  const projectType = tsEntryFiles.length ? 'ts' : 'js';
  setValue('PROJECT_TYPE', projectType);

  fse.ensureDirSync(iceTempPath);
  fse.emptyDirSync(iceTempPath);

  const plugins = getAllPlugin();
  // get runtime module
  const runtimeModules = plugins.map(({ pluginPath }) => {
    const modulePath = path.join(path.dirname(pluginPath), 'module.js');
    return fse.existsSync(modulePath) ? formatPath(modulePath) : false;
  })
    .filter(Boolean)
    .map(pluginPath => {
      const pkgPath = path.join(pluginPath, '../../package.json');
      const { pluginConfig } = fse.readJSONSync(pkgPath);
      const staticModule = (pluginConfig && pluginConfig.staticModule) || false;
      return {
        staticModule,
        path: pluginPath
      };
    });

  if (!userConfig.entry) {
    // modify default entry to src/app
    modifyUserConfig('entry', 'src/app');
  }

  onGetWebpackConfig((config: any) => {
    config.resolve.alias.set('ice$', path.join(iceTempPath, 'index.ts'));
    config.resolve.alias.set('ice', path.join(iceTempPath, 'pages'));

    // default alias of @/
    config.resolve.alias.set('@', path.join(rootDir, 'src'));

    const defineVariables = {
      'process.env.__IS_SERVER__': false
    };
    config
      .plugin('DefinePlugin')
      .tap(([args]) => [{ ...args, ...defineVariables }]);

    // add alias of basic dependencies
    const basicDependencies = [
      ['react', rootDir],
      ['react-dom', rootDir],
      'react-router-dom',
    ];
    basicDependencies.forEach((dep: string[]|string): void => {
      const [depName, searchFolder] = Array.isArray(dep) ? dep : [dep];
      const aliasPath = searchFolder
        ? require.resolve(depName, { paths: [searchFolder]})
        : require.resolve(depName);
      config.resolve.alias.set(depName, path.dirname(aliasPath));
    });

    // add babel exclude for node_modules module file
    const matchExclude = (filepath) => {
      const excludes = runtimeModules.map(runtimeModule => {
        // add default node_modules
        if (runtimeModule.path.includes('node_modules')) {
          return formatPath(runtimeModule.path);
        }
        return false;

      }).filter(Boolean);
      const matchReg = excludes.length ? new RegExp(excludes.join('|')) : null;
      if (matchReg && matchReg.test(filepath)) {
        return false;
      }
      // exclude node_modules as default
      return /node_modules/.test(filepath);
    };
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .exclude.clear()
        .add(matchExclude);
    });
  });

  const buildConfig = {};
  const BUILD_CONFIG_MAP = ['router', 'store', 'ssr'];
  Object.keys(userConfig).forEach(key => {
    if (BUILD_CONFIG_MAP.includes(key)) {
      buildConfig[key] = userConfig[key];
    }
  });

  // check global style file
  const generator = new Generator({
    projectRoot: rootDir,
    targetDir: iceTempPath,
    templateDir: path.join(__dirname, './generator/templates/app'),
    defaultData: {
      runtimeModules,
      buildConfig: JSON.stringify(buildConfig)
    }
  });

  const pageGenerator = new PageGenerator({
    rootDir,
    generator,
    templatePath: path.join(__dirname, './generator/templates/page/index.ts.ejs'),
    targetPath: iceTempPath,
  });

  async function renderIce() {
    pageGenerator.render();
    await generator.render();
  }

  // register store in build.json
  registerUserConfig({
    name: 'store',
    validation: 'boolean',
  });

  // register ssr in build.json
  registerUserConfig({
    name: 'ssr',
    validation: 'boolean',
  });

  // register utils method
  registerMethod('getPages', getPages);
  registerMethod('formatPath', formatPath);

  // registerMethod for modify page
  registerMethod('addPageExport', pageGenerator.addPageExport);
  registerMethod('removePageExport', pageGenerator.removePageExport);
  // pageGenerator.addPageExport('Index', { exportName: 'store', source: './store' });

  // registerMethod for add export
  const regsiterKeys = ['addIceExport', 'addIceTypesExport'];
  regsiterKeys.forEach((registerKey) => {
    registerMethod(registerKey, (exportData) => {
      generator.addExport(registerKey, exportData);
    });
    registerMethod(registerKey.replace('add', 'remove'), (removeExportName) => {
      generator.removeExport(registerKey, removeExportName);
    });
  });

  // watch src folder
  if (command === 'start') {
    const watchEvents = [];
    registerMethod('watchFileChange', (pattern, action) => {
      watchEvents.push([pattern, action]);
    });
    chokidar.watch(path.join(rootDir, 'src'), {
      ignoreInitial: true,
    }).on('all', (event, filePath) => {
      watchEvents.forEach(([pattern, action]) => {
        if (pattern instanceof RegExp && pattern.test(filePath)) {
          action(event, filePath);
        } else if (typeof pattern === 'string' && filePath.includes(pattern)) {
          action(event, filePath);
        }
      });
    });

    // watch pages change
    watchEvents.push([/src\/pages\/[A-Za-z.$]+$/, () => {
      renderIce();
    }]);
    // rerender when global style file added or removed
    watchEvents.push([/src\/global.(scss|less|css)/, async (event: string) => {
      if (event === 'unlink' || event === 'add') {
        await generator.render();
      }
    }]);
  }

  const registerAPIs = {
    addEntryImports: {
      apiKey: 'addContent',
    },
    addEntryCode: {
      apiKey: 'addContent',
    },
  };

  Object.keys(registerAPIs).forEach((apiName) => {
    registerMethod(apiName, (code, position = 'after') => {
      const { apiKey } = registerAPIs[apiName];
      generator[apiKey](apiName, code, position);
    });
  });

  onHook(`before.${command}.run`, async () => {
    await renderIce();
  });
};
