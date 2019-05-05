import React, { useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import logger from '@utils/logger';
import Context from './Context';

let didConnect = false;

const SocketProvider = ({ children, url, options }) => {
  const [connect, setConect] = useState(false);
  const socket = io(url, options);

  if (!didConnect) {
    socket.on('connect', () => {
      logger.debug('socket connect!!!');
      didConnect = true;
      setConect(true);
    });
    socket.on('disconnect', () => {
      logger.debug('socket disconnect!!!');
      didConnect = false;
      setConect(true);
    });
  }

  return <Context.Provider value={[socket, connect]}>{children}</Context.Provider>;
};

SocketProvider.defaultProps = {
  options: {},
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  options: PropTypes.object,
};

export default SocketProvider;
