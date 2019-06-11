import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import useModal from '@hooks/useModal';
import UserLoginModal from '../UserLoginModal';
import styles from './index.module.scss';

const User = ({ name, avatarUrl, isLogin }) => {
  const {
    on: onLoginModal,
    setModal: setLoginModal,
  } = useModal();

  function onOpenLogin() {
    setLoginModal(true);
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
      />
    </div>
  );
};

User.defaultProps = {
  name: '请登录',
  avatarUrl: 'https://img.alicdn.com/tfs/TB1hjBJXLxj_uVjSZFqXXaboFXa-147-150.jpg',
  isLogin: false,
};

User.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  isLogin: PropTypes.bool,
};

export default User;
