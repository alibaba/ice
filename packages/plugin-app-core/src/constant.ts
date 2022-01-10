const { validation } = require('@builder/app-helpers');

export const USER_CONFIG = [
  {
    name: 'store',
    validation: (val) => {
      return validation('store', val, 'object|boolean');
    }
  },
  {
    name: 'ssr',
    validation: 'boolean|string'
  },
  {
    name: 'auth',
    validation: 'boolean'
  },
  {
    name: 'request',
    validation: 'boolean'
  },
  {
    name: 'router',
    validation: 'object|boolean'
  },
  {
    name: 'sourceDir',
    validation: 'string',
  },
  {
    // add generateRuntime in case of runtimes do not pass the ts checker
    name: 'generateRuntime',
    validation: 'boolean',
    defaultValue: false,
  }
];

export const PROJECT_TYPE = 'PROJECT_TYPE';
export const TEMP_PATH = 'TEMP_PATH';

export const ICE_TEMP = 'ICE_TEMP';

/**
 * API_Names
 *
 * deprecated api
 * addIceExport、addIceTypesExport、addIceAppConfigTypes、addIceAppConfigAppTypes
 *
 * for ice and rax
 * addExport、addTypesExport、addAppConfigTypes、addAppConfigAppTypes
 */
export const EXPORT_API_MPA = [
  {
    name: ['addIceExport', 'addExport'],
    value: ['imports', 'exports']
  },
  {
    name: ['addIceTypesExport', 'addTypesExport'],
    value: ['typesImports', 'typesExports'],
  },
  {
    name: ['addIceAppConfigTypes', 'addAppConfigTypes'],
    value: ['appConfigTypesImports', 'appConfigTypesExports']
  },
  {
    name: ['addIceAppConfigAppTypes', 'addAppConfigAppTypes'],
    value: ['appConfigAppTypesImports', 'appConfigAppTypesExports']
  }
];

export const getExportApiKeys = () => {
  let apiKeys = [];
  EXPORT_API_MPA.forEach(item => {
    apiKeys = apiKeys.concat(item.name);
  });
  return apiKeys;
};
