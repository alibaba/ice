import React from 'react';
import { Loading } from '@alifd/next';

const FallbackComponent = () => {
  return (
    <div
      style={{
        minWidth: '240px',
        minHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Loading tip="Loading..." />
    </div>
  );
};
export default FallbackComponent;
