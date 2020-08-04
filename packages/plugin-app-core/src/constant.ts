export const USER_CONFIG = [
  {
    name: 'store',
    validation: 'boolean'
  },
  {
    name: 'ssr',
    validation: 'boolean'
  },
  {
    name: 'targets',
    validation: 'array'
  },
  {
    name: 'miniapp',
    validation: 'object'
  }
];

export const PROJECT_TYPE = 'PROJECT_TYPE';
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
