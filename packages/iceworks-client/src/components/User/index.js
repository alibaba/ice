import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import useModal from '@hooks/useModal';
import UserLoginModal from '../UserLoginModal';
import styles from './index.module.scss';

const User = ({ name, avatarUrl, isLogin, onLogin }) => {
  const {
    on: onLoginModal,
    setModal: setLoginModal,
  } = useModal();

  function onOpenLogin() {
    if (!isLogin) {
      setLoginModal(true);
    }
  }

  async function onSave(data) {
    await onLogin(data);
    setLoginModal(false);
  }

  return (
    <div className={cx({ [styles.wrap]: true, [styles.isLogin]: isLogin })} onClick={onOpenLogin}>
      <div className={styles.avatar}>
        <img src={avatarUrl} alt={name} />
      </div>
      <div className="user-name">{name}</div>
      <UserLoginModal
        on={onLoginModal}
        onCancel={() => setLoginModal(false)}
        onOk={onSave}
      />
    </div>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  isLogin: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default User;
