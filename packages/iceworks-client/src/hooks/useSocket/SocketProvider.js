import React, { useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import logger from '@utils/logger';
import Context from './Context';

let socket;

const SocketProvider = ({ children, url, options }) => {
  const [connect, setConect] = useState(false);

  if (!socket) {
    logger.debug('new socket');
    socket = io(url, options);

    socket.on('connect', () => {
      logger.debug('socket connected!!!');
      setConect(true);
    });
    socket.on('disconnect', () => {
      logger.debug('socket disconnected!!!');
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
