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

export const EXPORT_API_MPA = [
  {
    name: ['addIceExport'],
    value: ['imports', 'exports']
  },
  {
    name: ['addIceTypesExport'],
    value: ['typesImports', 'typesExports'],
  },
  {
    name: ['addIceAppConfigTypes'],
    value: ['appConfigTypesImports', 'appConfigTypesExports']
  },
  {
    name: ['addIceAppConfigAppTypes'],
    value: ['appConfigAppTypesImports', 'appConfigAppTypesExports']
  }
];

/**
 * API_KEYS
 *
 * deprecated api
 * addIceExport、addIceTypesExport、addIceAppConfigTypes、addIceAppConfigAppTypes
 *
 * for ice and rax
 * addExport、addTypesExport、addAppConfigTypes、addAppConfigAppTypes
 */
export const getExportApiKeys = () => {
  let apiKeys = [
    'addExport',
    'addTypesExport',
    'addAppConfigTypes',
    'addAppConfigAppTypes'
  ];
  EXPORT_API_MPA.forEach(item => {
    apiKeys = apiKeys.concat(item.name);
  });
  return apiKeys;
};
