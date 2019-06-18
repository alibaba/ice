import React from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';

import styles from './index.module.scss';

const NoData = ({ className }) => {
  return (
    <div className={cx(styles.tips, className)}>
      <Icon type="bad-news" size="l" className={styles.icon} />
      <FormattedMessage id="iceworks.material.noData" />
    </div>
  );
};

NoData.defaultProps = {
  className: '',
};

NoData.propTypes = {
  className: PropTypes.string,
};

export default NoData;
