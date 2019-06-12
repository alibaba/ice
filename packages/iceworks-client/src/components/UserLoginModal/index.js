import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { Message } from '@alifd/next';
import logger from '@utils/logger';
import appConfig from '@src/appConfig';
import styles from './index.module.scss';

const LOGIN_SITE = appConfig.isDev ? 'http://11.164.50.243' : 'https://ice.alibaba-inc.com';

function UserLoginModal({ on, onCancel, onOk }) {
  async function onMessage(message) {
    logger.debug('window got message:', message);

    const { data, origin } = message;
    const { user } = data;

    if (origin === LOGIN_SITE) {
      if (user) {
        await onOk(user);
      } else {
        Message.show({
          align: 'tr tr',
          type: 'error',
          content: '登录失败！',
        });
      }
    }
  }

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <Modal
      title="账号登录"
      visible={on}
      onCancel={onCancel}
      footer={false}
    >
      <div className={styles.wrap}>
        {on && <iframe
          title="User Login"
          src={`${LOGIN_SITE}/iceworks-login`}
          className={styles.iframe}
        />}
      </div>
    </Modal>
  );
}

UserLoginModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default UserLoginModal;
