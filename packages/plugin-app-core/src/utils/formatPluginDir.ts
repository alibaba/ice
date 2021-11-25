import * as path from 'path';

export default (pluginDir?: string) => {
  return pluginDir ? path.basename(pluginDir).replace(/^build-plugin(-ice-|-rax-|-)?/, '') : 'local';
};
