import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Message } from '@alifd/next';
import { FormattedMessage, injectIntl } from 'react-intl';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import socket from '@src/socket';
import useSocket from '@hooks/useSocket';
import logger from '@utils/logger';

const ConnectModal = ({ connect, intl }) => {
  const [status, setStatus] = useState(false);
  const { on, setModal } = useModal(true);

  async function onOk() {
    setStatus(true);
    try {
      await socket.emit('home.system.startIceworks');
      setModal(false);
    } catch (error) {
      Message.show({
        type: 'error',
        align: 'tr tr',
        title: '提示',
        content: error.message,
      });
    }
  }

  useSocket('system.start.iceworks', data => {
    logger.info('system.start.iceworks', data);
    if (data) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  });

  return !connect ? (
    <Modal
      title={intl.formatMessage({ id: 'iceworks.global.disconnect.title' })}
      visible={on}
      okProps={{ disabled: status }}
      onCancel={() => setModal(false)}
      onOk={onOk}
    >
      <FormattedMessage id="iceworks.global.disconnect.message" />
    </Modal>
  ) : null;
};

ConnectModal.propTypes = {
  connect: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ConnectModal);
