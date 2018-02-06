import React from 'react';
import Layout from '@icedesign/layout';
import Logo from './Logo';

export default () => {
  return (
    <Layout.Footer
      className="ice-admin-layout-footer"
      style={{
        textAlign: 'center',
        lineHeight: '36px',
      }}
    >
      <div className="ice-admin-layout-footer-body">
        <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
          <Logo />
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
          <br />
          © 2018 版权所有
        </div>
      </div>
    </Layout.Footer>
  );
};
