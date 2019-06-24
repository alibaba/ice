import React from 'react';
import { Balloon } from '@alifd/next';
import Icon from '@components/Icon';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const TipIcon = (props) => {
  return (
    <Balloon
      type="primary"
      trigger={<Icon type="info" size="small" className={styles.tipIcon} />}
      closable={false}
    >
      {props.children}
    </Balloon>
  );
};

TipIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TipIcon;
