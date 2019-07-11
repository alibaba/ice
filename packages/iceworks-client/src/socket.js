import io from 'socket.io-client';
import logger from '@utils/logger';
import goldlog from '@utils/goldlog';
import appConfig from './appConfig';

// ref: https://socket.io/docs/client-api/#new-Manager-url-options
const socket = io(appConfig.socketUrl, {
  // number of reconnection attempts before giving up
  reconnectionAttempts: 3,
});

socket.on('error', error => {
  logger.error(error);
});

const originalEmit = socket.emit.bind(socket);
socket.emit = function emit(...args) {
  return new Promise((resolve, reject) => {
    const eventNameStr = args[0];

    if (eventNameStr.indexOf('adapter') > -1) {
      const eventNameArr = eventNameStr.split('.');
      const [namespace, module, action] = eventNameArr;
      goldlog({
        namespace,
        module,
        action,
        data: args[1] ? args[1] : {},
      });
    }

    if (!args[1]) {
      args.push({});
    }

    args.push((error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });

    originalEmit(...args);
  });
};

export default socket;
