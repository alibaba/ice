import * as path from 'path'
import * as fse from 'fs-extra'
import * as chokidar from 'chokidar';
import * as globby from 'globby'
import Generator from './generator'
import UsePageGenerator from './generator/usePageGenerator'
import getPages from './utils/getPages'

const ICE_ALIAS = ['ice']

export default (api) => {
  const { onHook, onGetWebpackConfig, registerMethod, context, getAllPlugin, setValue, modifyUserConfig } = api
  const { rootDir, command } = context;

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
    return fse.existsSync(modulePath) ? modulePath : false;
  }).filter(Boolean);

  // modify entry to src/app
  modifyUserConfig('entry', 'src/app');

  onGetWebpackConfig((config: any) => {
    ICE_ALIAS.forEach(i => {
      config.resolve.alias.set(i, path.join(iceTempPath));
    });

    // default alias of @/
    config.resolve.alias.set('@', path.join(rootDir, 'src'));

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
      config.resolve.alias.set(depName, aliasPath);
    });

    // add babel exclude for node_modules module file
    const matchExclude = (filepath) => {
      const excludes = runtimeModules.map(modulePath => {
        // add default node_modules
        if (modulePath.includes('node_modules')) {
          return process.platform === 'win32' ? modulePath.replace(/\\/g, '\\\\') : modulePath;
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
  })
  // check global style file
  const generator = new Generator({
    projectRoot: rootDir,
    targetDir: iceTempPath,
    templateDir: path.join(__dirname, './generator/templates/app'),
    defaultData: {
      runtimeModules,
    }
  })

  const usePageGenerator = new UsePageGenerator({
    rootDir,
    generator,
    templatePath: path.join(__dirname, './generator/templates/usePage/usePage.ts.ejs'),
    targetPath: iceTempPath,
  });

  async function renderIce() {
    usePageGenerator.render();
    await generator.render();
  }

  // register utils method
  registerMethod('getPages', getPages);

  // registerMethod for modify usePage
  registerMethod('addUsePageExport', usePageGenerator.addUsePageExport);
  registerMethod('removeUsePageExport', usePageGenerator.removeUsePageExport);
  // usePageGenerator.addUsePageExport('Index', { exportName: 'store', source: './store' });

  // registerMethod for add export
  const regsiterKeys = ['addUseAppExport', 'addIceExport'];
  regsiterKeys.forEach((registerKey) => {
    registerMethod(registerKey, (exportData) => {
      generator.addExport(registerKey, exportData);
    });
    registerMethod(registerKey.replace('add', 'remove'), (removeExportName) => {
      generator.removeExport(registerKey, removeExportName);
    })
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
    })
  });

  onHook(`before.${command}.run`, async () => {
    await renderIce();
  })
}
