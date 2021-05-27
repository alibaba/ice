import * as path from 'path';
import getPages from '../utils/getPages';
import getRoutes from '../utils/getRoutes';
import formatPath from '../utils/formatPath';
import getSourceDir from '../utils/getSourceDir';
import { getExportApiKeys } from '../constant';
import importDeclarations from './importDeclarations';

interface IRenderData {
  [key: string]: any;
}

interface ITemplateOptions {
  template: string;
  targetDir: string;
}

export default (api, options) => {
  const { registerMethod } = api;
  const { generator } = options;

  // register utils method
  registerMethod('getPages', getPages);
  registerMethod('formatPath', formatPath);
  registerMethod('getRoutes', getRoutes);
  registerMethod('getSourceDir', getSourceDir);

  // registerMethod for modify page
  registerMethod('addPageExport', generator.addPageExport);
  registerMethod('removePageExport', generator.removePageExport);

  // registerMethod for render content
  registerMethod('addRenderFile', generator.addRenderFile);
  registerMethod('addPluginTemplate', (pluginName?: string) => (templateOptions: string|ITemplateOptions, extraData: IRenderData) => {
    const { template, targetDir } = typeof templateOptions === 'string'
      ? { template: templateOptions, targetDir: pluginName ? path.basename(pluginName).replace(/^build-plugin(-ice-|-)?/, '') : 'local' }
      : templateOptions;
    generator.addTemplateFiles({
      template,
      // overwrite target dir, build-plugin-ice-request => request
      targetDir: `plugins/${targetDir}`,
    }, extraData);
  }, { pluginName: true });
  registerMethod('modifyRenderData', generator.modifyRenderData);
  registerMethod('addDisableRuntimePlugin', generator.addDisableRuntimePlugin);

  function addImportDeclaration(data) {
    const { importSource, exportMembers, exportDefault, alias } = data;
    if (importSource) {
      if (exportMembers) {
        exportMembers.forEach((exportMember) => {
          // import { withAuth } from 'ice' -> import { withAuth } from 'ice/auth';
          importDeclarations[exportMember] = {
            value: importSource,
            type: 'normal',
          };
        });
      } else if (exportDefault) {
        // import { Helmet } from 'ice' -> import Helmet from 'ice/helmet';
        importDeclarations[exportDefault] = {
          value: importSource,
          type: 'default',
        };
      }
      if (alias) {
        Object.keys(alias).forEach(exportMember => {
          // import { Head } from 'ice'; -> import { Helmet as Head } from 'react-helmet';
          importDeclarations[exportMember] = {
            value: importSource,
            type: 'normal',
            alias: alias[exportMember],
          };
        });
      }
    }
  }

  registerMethod('addImportDeclaration', addImportDeclaration);

  api.setValue('importDeclarations', importDeclarations);
  // registerMethod for add export
  const apiKeys = getExportApiKeys();
  apiKeys.forEach((apiKey) => {
    registerMethod(apiKey, (exportData) => {
      addImportDeclaration(exportData);
      generator.addExport(apiKey, exportData);
    });
    registerMethod(apiKey.replace('add', 'remove'), (removeExportName) => {
      generator.removeExport(apiKey, removeExportName);
    });
  });

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
};
