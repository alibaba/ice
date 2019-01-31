import React from 'react';
import './index.scss';

const Nofity = ({ style }) => {
  return (
    <div className="notify" style={{ ...style }}>
      <span className="heartbit" />
      <span className="point" />
    </div>
  );
};

export default Nofity;
