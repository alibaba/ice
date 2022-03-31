import * as chokidar from 'chokidar';
import type { WatchOptions } from 'chokidar';
import type { WatchEvent } from '@ice/types/esm/plugin.js';
import formatPath from '../utils/formatPath.js';

function createWatch(options: {
  watchDir: string;
  command: string;
  watchOptions?: WatchOptions;
  watchEvents?: WatchEvent[];
}) {
  const { watchDir, command, watchOptions } = options;
  const watchEvents = options.watchEvents || [];
  // do not setup chokidar when run build
  const watcher = command === 'start' && chokidar.watch(watchDir, {
    ignoreInitial: true,
    ignored: [/node_modules/],
    ...(watchOptions || {}),
  }).on('all', (event, filePath) => {
    watchEvents.forEach(([pattern, action]) => {
      const formattedPath = formatPath(filePath);
      if (pattern instanceof RegExp && pattern.test(formattedPath)) {
        action(event, formattedPath);
      } else if (typeof pattern === 'string' && formattedPath.includes(pattern)) {
        action(event, formattedPath);
      }
    });
  });

  return {
    watcher,
    addWatchEvent: ([pattern, action, name]: WatchEvent) => {
      watchEvents.push([pattern, action, name]);
    },
    removeWatchEvent: (name: string) => {
      const eventIndex = watchEvents.findIndex(([,,watchName]) => watchName === name);
      watchEvents.splice(eventIndex, 1);
    },
  };
}

export default createWatch;