import type { Plugin } from '@ice/app/types';
import type { Request, Interceptors, InterceptorRequest, InterceptorResponse } from './types';

// @ts-ignore
// eslint-disable-next-line
interface PluginRequestOptions { }

const PLUGIN_NAME = '@ice/plugin-request';

const plugin: Plugin<PluginRequestOptions | void> = () => ({
  name: PLUGIN_NAME,
  setup: ({ generator }) => {
    // Add useRequest export for 'ice'.
    //   import { useRequest } from 'ice';
    generator.addExport({
      specifier: ['useRequest'],
      source: '@ice/plugin-request/hooks',
      type: false,
    });
    //   import { request } from 'ice';
    generator.addExport({
      specifier: ['request'],
      source: '@ice/plugin-request/request',
      type: false,
    });
  },
  runtime: `${PLUGIN_NAME}/runtime`,
  staticRuntime: true,
  keepExports: ['requestConfig'],
});

export type {
  Request,
  Interceptors,
  InterceptorRequest,
  InterceptorResponse,
  PluginRequestOptions,
};
export default plugin;
