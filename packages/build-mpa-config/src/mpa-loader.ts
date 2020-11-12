import { getOptions } from 'loader-utils';
import { formatPath } from 'build-app-helpers';

const IGNORE_LOADER_CODE = '?_IGNORE_MPA_LOADER';
function mpaLoader(code) {
  const options = getOptions(this) || {};
  const framework = options.framework || 'rax';
  const enableMpaLoader = this.resourcePath.match(new RegExp(options.includeEntryList.join('|')))
    || this.request.includes(IGNORE_LOADER_CODE);
  if (!enableMpaLoader) {
    return code;
  }
  // eslint-disable-next-line
  return require(`./template/${framework}`)({ type: options.type, resourcePath: `${formatPath(this.resourcePath)}${IGNORE_LOADER_CODE}`});
}

export default mpaLoader;
