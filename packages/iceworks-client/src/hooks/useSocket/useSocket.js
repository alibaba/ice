/* eslint consistent-return:0 */
import { useContext, useEffect } from 'react';
import Context from './Context';

function useSocket(eventName, callback) {
  const socket = useContext(Context);

  useEffect(() => {
    if (eventName && callback) {
      socket.on(eventName, callback);

      return () => socket.removeListener(eventName, callback);
    }
  }, []);

  return socket;
}

export default useSocket;
