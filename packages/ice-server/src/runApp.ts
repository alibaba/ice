import * as path from 'path';
import * as fs from 'fs';
import { hooks } from '@midwayjs/hooks';
import { setMidwayConfiguration } from './midwayConfiguration';
import { AppConfig } from './types';

// export * from '@ice/server-internal';

export function runApp(appConfig: AppConfig = {}) {
  const { modules = [], addMiddlewares, app: { onConfigLoad, onReady, onStop }} = appConfig;

  const defaultImportConfigs = generateDefaultImportConfigs();
  const defaultModules = generateDefaultModules();

  const configuration = {
    importConfigs: [...defaultImportConfigs],
    modules: [...defaultModules, ...modules],
    addMiddlewares,
    onConfigLoad,
    onReady,
    onStop,
  };

  // server will get the appConfig after runApp
  setMidwayConfiguration(configuration);
}

function generateDefaultModules() {
  return [hooks()];
}

function generateDefaultImportConfigs() {
  const importConfigs = [];

  const configDir = path.join(process.cwd(), 'src/apis/config/');
  if (fs.existsSync(configDir)) {
    importConfigs.push(configDir);
  }

  return importConfigs;
}
