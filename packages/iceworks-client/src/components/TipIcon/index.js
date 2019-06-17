import React from 'react';
import { Balloon, Icon } from '@alifd/next';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const TipIcon = (props) => {
  return (
    <Balloon
      type="primary"
      trigger={<Icon type="prompt" size="xs" className={styles.tipIcon} />}
      closable={false}
    >
      {props.children}
    </Balloon>
  );
};

TipIcon.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TipIcon;
