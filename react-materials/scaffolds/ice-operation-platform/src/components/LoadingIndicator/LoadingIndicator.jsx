import React from 'react';
import { Loading } from '@icedesign/base';

const LoadingIndicator = () => {
  return (
    <Loading
      shape="fusion-reactor"
      color="#fff"
      style={{ display: 'block', height: '100%' }}
    >
      <div style={{ background: 'transparent' }} />
    </Loading>
  );
};

export default LoadingIndicator;
