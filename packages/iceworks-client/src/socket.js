
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

export default socket;
