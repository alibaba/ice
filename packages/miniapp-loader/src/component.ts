import * as path from 'path';
import { getOptions, stringifyRequest } from '@ice/bundles/compiled/loader-utils/index.js';
import type webpack from 'webpack';
import normalizePath from './utils/normalizePath.js';


export default function (this: webpack.LoaderContext<any>) {
  const options = getOptions(this);
  const stringify = (s: string): string => stringifyRequest(this, s);
  const { isNeedRawLoader } = options.loaderMeta;
  // raw is a placeholder loader to locate changed .vue resource
  const raw = path.join(__dirname, 'raw.js');
  const { loaders } = this;
  const thisLoaderIndex = loaders.findIndex(item => normalizePath(item.path).indexOf('@ice/miniapp-loader/lib/component') >= 0);
  const componentPath = isNeedRawLoader
    ? `${raw}!${this.resourcePath}`
    : this.request.split('!').slice(thisLoaderIndex + 1).join('!');
  const { globalObject } = this._compilation?.outputOptions || { globalObject: 'wx' };

  const prerender = `
if (typeof PRERENDER !== 'undefined') {
  ${globalObject}._prerender = inst
}`;
  return `import { createComponentConfig } from '@ice/miniapp-runtime'
import component from ${stringify(componentPath)}
var inst = Component(createComponentConfig(component, '${options.name}'))
${options.prerender ? prerender : ''}
`;
}
