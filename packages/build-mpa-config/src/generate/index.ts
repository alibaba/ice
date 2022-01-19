import { IPluginAPI } from 'build-scripts';
import ReactGenerator from './ReactGenerator';
import RaxGenerator from './RaxGenerator';
import { IGeneratorOptions, IGenerateResult } from '../types';

function generatePageFiles(api: IPluginAPI, options: IGeneratorOptions): IGenerateResult {
  const { framework, pageEntry, isAppEntry } = options;
  let generator;
  if (framework === 'react') {
    generator = new ReactGenerator(api, options);
  } else if (framework === 'rax') {
    generator = new RaxGenerator(api, options);
  }

  const { context: { userConfig } } = api;
  // 在分析运行时依赖的场景下，不能直接执行 generator
  // 需要在分析完成并执行 disableRuntimePlugins 逻辑后，再执行生成
  const generateTasks = [];
  generateTasks.push(() => {
    generator.generateRunAppFile(userConfig);
  });

  // Do not modify the page entry when entryPath ends with app.ts
  if (isAppEntry) {
    return {
      generator,
      generateTasks,
      entryPath: pageEntry,
      runAppPath: generator.runAppPath,
      routesFilePath: generator.routesFilePath,
    };
  }
  generateTasks.push(() => {
    generator.generateEntryFile();
  });

  return {
    generator,
    generateTasks,
    entryPath: generator.entryPath,
    runAppPath: generator.runAppPath,
    routesFilePath: generator.routesFilePath,
  };
}

export default generatePageFiles;
