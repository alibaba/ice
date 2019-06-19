import io from 'socket.io-client';
import logger from '@utils/logger';
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
