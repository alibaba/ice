import React from 'react';
import Logo from '../Logo';

export default () => {
  return (
    <div
      style={{
        width: '100%',
        padding: '20px 40px',
        textAlign: 'center',
        lineHeight: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
        <Logo style={{ color: '#666' }} />
      </div>
      <div
        style={{
          color: '#999',
          lineHeight: 1.5,
          fontSize: 12,
          textAlign: 'right',
        }}
      >
        阿里巴巴集团
        <br />© 2018 版权所有
      </div>
    </div>
  );
};
