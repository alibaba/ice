const ipc = require('node-ipc');

ipc.config.id = 'ice-sdk';
ipc.config.silent = true;
let connected = false;

const ON_ICEWORKS = typeof process.env.ICEWORKS_IPC !== 'undefined';

if (ON_ICEWORKS) {
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
}

module.exports = {
  available: ON_ICEWORKS,
  send: (data) => {
    // 尽在可用的环境下发送消息，scoket 的链接在任何状态下都可
    if (connected && ON_ICEWORKS) {
      ipc.of.iceworks.emit('message', {
        path: process.cwd(),
        message: data,
      });
    }
  },
};
