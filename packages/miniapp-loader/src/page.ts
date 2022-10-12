import * as path from 'path';
import * as loaderUtils from '@ice/bundles/compiled/loader-utils/index.js';
import type webpack from 'webpack';
import normalizePath from './utils/normalizePath.js';

interface PageConfig {
  content: any;
  path: string;
}

const { getOptions, stringifyRequest } = loaderUtils;
export default function (this: webpack.LoaderContext<any>) {
  const options = getOptions(this);
  const { config: loaderConfig } = options;
  const config = getPageConfig(loaderConfig, this.resourcePath);
  const configString = JSON.stringify(config);
  const stringify = (s: string): string => stringifyRequest(this, s);
  const { loaders } = this;
  const thisLoaderIndex = loaders.findIndex(item => normalizePath(item.path).indexOf('miniapp-loader/lib/page') >= 0);
  const componentPath = this.request.split('!').slice(thisLoaderIndex + 1).join('!');

  let instantiatePage = `var inst = Page(createPageConfig(component, '${options.name}', {root:{cn:[]}}, { getData, getConfig }, config || {}))`;
  // TODO: 加参数决定是否要传入 getData 及 getConfig
  return `import { createPageConfig } from '@ice/miniapp-runtime';
import component from ${stringify(componentPath)};
import { getData, getConfig } from ${stringify(componentPath)};
var config = ${configString};
${config.enableShareTimeline ? 'component.enableShareTimeline = true' : ''}
${config.enableShareAppMessage ? 'component.enableShareAppMessage = true' : ''}
${instantiatePage}
`;
}

export function getPageConfig(configs: Record<string, PageConfig>, resourcePath: string) {
  const configPath = `${removeExt(resourcePath)}.config`;
  for (const name in configs) {
    const config = configs[name];
    const currentPath = config.path.endsWith('.config') ? config.path : removeExt(config.path);
    if (currentPath === configPath) {
      return config.content;
    }
  }
  return {};
}

function removeExt(file: string) {
  return path.join(path.dirname(file), path.basename(file, path.extname(file)));
}
