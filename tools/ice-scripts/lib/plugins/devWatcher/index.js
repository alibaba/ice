const path = require('path');
const chokidar = require('chokidar');

let server = null;
let watcher = null;

module.exports = ({ onHook, log, context }) => {
  const { command, rootDir } = context;
  // watch ice.config.js in dev mode
  if (command === 'dev') {
    // setup watch
    // check watcher in case of reRun plugins
    if (!watcher) {
      const configPath = path.resolve(rootDir, 'ice.config.js');
      watcher = chokidar.watch(configPath, {
        ignoreInitial: true,
      });

      const onUserChange = () => {
        console.log('\n');
        log.info('ice.config.js has been changed');
        if (!server) {
          log.error('dev server is not ready');
        } else {
          server.close();
          server = null;
          log.info('restart dev server');
          process.send({ type: 'RESTART_DEV' });
        }
      };

      watcher.on('change', () => {
        // apply hook when user config is changed
        onUserChange();
      });

      watcher.on('error', (error) => {
        log.error('fail to watch file', error);
        process.exit(1);
      });
    }

    onHook('afterDevServer', (devServer) => {
      server = devServer;
    });
  }
};
