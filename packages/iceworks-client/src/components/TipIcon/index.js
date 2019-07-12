import React from 'react';
import { Balloon } from '@alifd/next';
import Icon from '@components/Icon';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const { Tooltip } = Balloon;

const TipIcon = (props) => {
  const triggerIcon = (
    <Icon
      type="info-circle"
      size="xs"
      className={styles.tipIcon}
    />
  );

  return (
    <Tooltip
      trigger={triggerIcon}
      align="b"
      {...props}
    >
      {props.children}
    </Tooltip>
  );
};

TipIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TipIcon;
