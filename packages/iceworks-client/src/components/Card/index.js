import React from 'react';
import PropTypes from 'prop-types';
import { Card as NextCard } from '@alifd/next';

const Card = ({ children, style, ...props }) => {
  return (
    <NextCard
      style={{
        border: 'none',
        height: '100%',
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
