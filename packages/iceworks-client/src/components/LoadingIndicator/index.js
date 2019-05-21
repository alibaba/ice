import React from 'react';
import { Loading } from '@alifd/next';

const LoadingIndicator = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Loading color="#fff" />
    </div>
  );
};

export default LoadingIndicator;
