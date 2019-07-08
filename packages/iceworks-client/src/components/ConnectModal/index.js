import React, { useState } from 'react';
import PropTypes from 'prop-types';
import socket from '@src/socket';
import { FormattedMessage, injectIntl } from 'react-intl';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import showMessage from '@utils/showMessage';

let listen = false;

const ConnectModal = ({ intl }) => {
  const [status, setStatus] = useState('connect');
  const { on, setModal } = useModal(true);

  if (!listen) {
    socket.on('connect', () => {
      setStatus('connect');
      showMessage('服务连接成功', 'success');
    });

    socket.on('reconnecting', () => {
      setStatus('reconnecting');
    });

    socket.on('reconnect_failed', () => {
      setStatus('reconnect_failed');
    });

    socket.on('disconnect', () => {
      setStatus('disconnect');
    });

    listen = true;
  }

  const CONNECT_MAP = {
    connect: 'iceworks.global.connect',
    reconnecting: 'iceworks.global.reconnecting',
    reconnect_failed: 'iceworks.global.reconnect_failed',
    disconnect: 'iceworks.global.disconnect',
  };

  return status !== 'connect' ? (
    <Modal
      title={intl.formatMessage({ id: 'iceworks.global.disconnect.title' })}
      style={{ width: '320px' }}
      visible={on}
      footer={false}
      onCancel={() => setModal(false)}
    >
      <FormattedMessage id={CONNECT_MAP[status]} />
    </Modal>
  ) : null;
};

ConnectModal.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ConnectModal);
