import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import styles from './index.module.scss';


function UserLoginModal({ on, onCancel }) {
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
          id="webview"
          src="http://ice.alibaba-inc.com/iceworks-login"
          style={{ width: '100%', height: '100%' }}
        />}
      </div>
    </Modal>
  );
}

UserLoginModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserLoginModal;
