import React from 'react';
import { Loading } from '@alifd/next';
import useLoadingTheme from '@hooks/useLoadingTheme';

const LoadingIndicator = () => {
  const { loadingTheme } = useLoadingTheme();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Loading color={loadingTheme.color} />
    </div>
  );
};

export default LoadingIndicator;
