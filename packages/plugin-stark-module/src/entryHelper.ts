import { Json } from './types';

export const getModules = (modules?: Json<string>[]) => {
  return modules || {
    'index': './src/index'
  };
};

export const hasModules = (modules?: Json<string>[]) => {
  return !!modules;
};
