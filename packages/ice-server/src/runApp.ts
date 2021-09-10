import * as path from 'path';
import * as fs from 'fs';
import { hooks } from '@midwayjs/hooks';
import { BucLoginModule, ModuleImpl } from '@ice/server-internal';
import { setMidwayConfiguration } from './midwayConfiguration';
import { AppConfig, AppModule } from './types';

export * from '@ice/server-internal';

console.log('cwd in ice-server ===>', process.cwd());

const defaultModules = {
  bucLogin: new BucLoginModule(),
};
const defaultModuleKeys = Reflect.ownKeys(defaultModules);

export function runApp(appConfig: AppConfig = {}) {
  const importConfigs = generateImportConfigs();
  const importModules = generateImportModules(appConfig);
  const lifeCycleQueue = generateLifeCycleQueue(appConfig);
  const { onConfigLoad, onReady, onStop } = lifeCycleQueue;

  const configuration = {
    importConfigs,
    imports: importModules,
    onConfigLoadQueue: onConfigLoad,
    onReadyQueue: onReady,
    onStopQueue: onStop,
  };
  // server will get the appConfig after runApp
  setMidwayConfiguration(configuration);
}

function generateImportModules(appConfig: AppConfig) {
  const importModules: AppModule[] = [hooks()];

  defaultModuleKeys.forEach((moduleKey: string) => {
    if (appConfig[moduleKey]) {
      const module = defaultModules[moduleKey];
      importModules.push(...module.getModules());
    }
  });

  importModules.push(...(appConfig.modules || []));

  return importModules;
}

function generateLifeCycleQueue(appConfig: AppConfig) {
  const lifeCycleQueue = {
    onReady: [],
    onStop: [],
    onConfigLoad: [],
  };

  // add module life cycle to its queue
  defaultModuleKeys.forEach((moduleKey: string) => {
    if (appConfig[moduleKey]) {
      const module: ModuleImpl = defaultModules[moduleKey];
      Object.keys(lifeCycleQueue).forEach((key: string) => {
        if (module[key]) {
          lifeCycleQueue[key].push(module[key]);
        }
      });
    }
  });
  // add user life cycle
  Object.keys(lifeCycleQueue).forEach((key: string) => {
    if (appConfig[key]) {
      lifeCycleQueue[key].push(appConfig[key]);
    }
  });

  return lifeCycleQueue;
}

function generateImportConfigs() {
  const importConfigs = [];

  const configDir = path.join(process.cwd(), 'src/apis/config');
  if (fs.existsSync(configDir)) {
    importConfigs.push(configDir);
  }

  return importConfigs;
}
