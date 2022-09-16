import { fileURLToPath } from 'url';
import path from 'path';
import type { Plugin } from '@ice/types';
import type { Request, Interceptors, InterceptorRequest, InterceptorResponse } from './types';

// @ts-ignore
// eslint-disable-next-line
interface PluginRequestOptions {}

const plugin: Plugin<PluginRequestOptions | void> = () => ({
  name: 'plugin-request',
  setup: ({ generator }) => {
    // Add useRequest export for 'ice'.
    //   import { useRequest } from 'ice';
    generator.addExport({
      specifier: 'useRequest',
      source: '@ice/plugin-request/hooks',
      type: false,
    });
    //   import { request } from 'ice';
    generator.addExport({
      specifier: 'request',
      source: '@ice/plugin-request/request',
      type: false,
    });
  },
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime.js'),
});

export type {
  Request,
  Interceptors,
  InterceptorRequest,
  InterceptorResponse,
  PluginRequestOptions,
};
export default plugin;
