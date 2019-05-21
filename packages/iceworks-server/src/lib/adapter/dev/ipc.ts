import * as ipc from 'node-ipc';

ipc.config.id = 'iceworks';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.serveNet(() => {
  ipc.server.on('message', (data) => {
    ipc.log('Got a message:', data);
  });

  ipc.server.on('socket.disconnected', (data) => {
    ipc.log('DISCONNECTED\n', data);
  });
});

ipc.server.on('error', (err) => {
  ipc.log('Got an error:', err);
});

function init() {
  ipc.server.start();
  console.log('Start IPC Server');
}

export { init };
