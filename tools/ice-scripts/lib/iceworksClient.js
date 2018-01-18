const ipc = require('node-ipc');

ipc.config.id = 'ice-sdk';
ipc.config.silent = true;
let connected = false;

ipc.connectToNet('iceworks', function() {
  ipc.of.iceworks.on('connect', function() {
    connected = true;
    console.log('iceworks ipc 链接成功');
  });
  ipc.of.iceworks.on('disconnect', function() {
    connected = false;
    ipc.log('disconnected from iceworks');
  });
});

module.exports = {
  available: typeof process.env.ICEWORKS_IPC !== 'undefined',
  send: (data) => {
    if (connected) {
      ipc.of.iceworks.emit('message', {
        path: process.cwd(),
        message: data,
      });
    }
  },
};
