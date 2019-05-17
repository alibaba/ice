import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const SubMenu = ({ children, title }) => {
  return (
    <div className={styles.wrapper}>
      {
        title ?
          <h2 className={styles.title}>
            <FormattedMessage id={title} />
          </h2> :
          null
      }
      {children}
    </div>
  );
};

SubMenu.defaultProps = {
  title: '',
};

SubMenu.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

export default SubMenu;
