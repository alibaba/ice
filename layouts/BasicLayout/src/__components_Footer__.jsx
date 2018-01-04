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
        <div
          style={{
            color: '#999',
            lineHeight: 1.5,
            fontSize: 12,
            textAlign: 'right',
          }}
        >
          淘宝技术部 终端技术团队{' '}
          <a href="##">
            帮助支持
          </a>{' '}
          <a href="##">
            提交反馈
          </a>
          <br />
          由{' '}
          <a href="https://www.taobao.com" rel="noopener noreferrer" target="_blank">
            ICE
          </a>{' '}
          提供技术支持
        </div>
      </div>
    </Layout.Footer>
  );
};
