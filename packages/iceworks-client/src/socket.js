import io from 'socket.io-client';
import logger from '@utils/logger';
import appConfig from './appConfig';

const socket = io(appConfig.socketUrl);

socket.on('connect', () => {
  logger.debug('socket connected!!!');
});

socket.on('disconnect', () => {
  logger.debug('socket disconnected!!!');
});

const originalEmit = socket.emit.bind(socket);
socket.emit = function emit(...args) {
  return new Promise((resolve, reject) => {
    if (!args[1]) {
      args.push({});
    }

    args.push(({ error, data }) => {
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
