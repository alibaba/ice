import React from 'react';
import Layout from '@icedesign/layout';
import Logo from './__components_Logo__';

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
        <div className="copyright">
          © 2018 Theme designed by{' '}
          <a
            href="https://github.com/alibaba/ice"
            target="_blank"
            className="copyright-link"
            rel="noopener noreferrer"
          >
            ICE
          </a>
        </div>
      </div>
    </Layout.Footer>
  );
};
