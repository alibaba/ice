/* eslint consistent-return:0 */
import { useContext, useEffect } from 'react';
import logger from '@utils/logger';
import Context from './Context';

function useSocket(eventName, callback) {
  const [socket] = useContext(Context);

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

export default useSocket;
