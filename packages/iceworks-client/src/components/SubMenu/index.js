import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const SubMenu = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      {title ? (
        <h2 className={styles.title}>
          <FormattedMessage id={title} />
        </h2>
      ) : null}
      {children}
    </div>
  );
};

SubMenu.defaultProps = {
  title: '',
  children: null,
};

SubMenu.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default SubMenu;
