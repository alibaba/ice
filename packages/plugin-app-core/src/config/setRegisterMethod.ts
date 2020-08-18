import getPages from '../utils/getPages';
import getRoutes from '../utils/getRoutes';
import formatPath from '../utils/formatPath';
import getSourceDir from '../utils/getSourceDir';
import { getExportApiKeys } from '../constant';

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

  // registerMethod for add export
  const apiKeys = getExportApiKeys();
  apiKeys.forEach((apiKey) => {
    registerMethod(apiKey, (exportData) => {
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
