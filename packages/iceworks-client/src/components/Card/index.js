import React from 'react';
import PropTypes from 'prop-types';
import { Card as NextCard } from '@alifd/next';
import styles from './index.module.scss';

const Card = ({ children, style, ...props }) => {
  return (
    <NextCard
      className={styles.card}
      style={{
        border: 'none',
        height: '100%',
        overflow: 'auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </NextCard>
  );
};

export default Card;

Card.defaultProps = {
  showTitleBullet: false,
  style: {},
};

Card.propTypes = {
  style: PropTypes.object,
  showTitleBullet: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
