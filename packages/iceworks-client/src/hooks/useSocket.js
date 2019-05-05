/* eslint consistent-return:0 */
import { useEffect } from 'react';
import logger from '@utils/logger';
import socket from '@src/socket';

export default function useSocket(eventName, callback) {
  useEffect(() => {
    if (eventName && callback) {
      logger.debug(`socket on ${eventName}.`);
      socket.on(eventName, callback);

      return () => {
        logger.debug(`socket removeListener ${eventName}.`);
        socket.removeListener(eventName, callback);
      };
    }
  }, []);

  return socket;
}
