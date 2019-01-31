import React, { PureComponent } from 'react';
import Layout from '@icedesign/layout';
import cx from 'classnames';
import Logo from '../Logo';

import styleNames from './index.module.scss';

export default class Footer extends PureComponent {
  render() {
    const { className, style } = this.props;
    return (
      <Layout.Footer
        className={cx('ice-design-layout-footer', className)}
        style={{
          ...style,
          lineHeight: '36px',
        }}
      >
        <div className={styleNames.iceDesignLayoutFooterBody}>
          <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
            <Logo style={{ color: '#666' }} />
          </div>
          <div className={styleNames.copyright}>
            © 2018 Theme designed by{' '}
            <a
              href="https://github.com/alibaba/ice"
              target="_blank"
              className={styleNames.copyrightLink}
              rel="noopener noreferrer"
            >
              ICE
            </a>
          </div>
        </div>
      </Layout.Footer>
    );
  }
}
