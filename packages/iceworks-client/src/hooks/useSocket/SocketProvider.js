import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Context from './Context';

const SocketProvider = ({ children, url, options }) => {
  const socket = io(url, options);

  return <Context.Provider value={socket}>{children}</Context.Provider>;
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
