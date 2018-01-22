import React from 'react';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import { Icon } from '@icedesign/base';
import { Link } from 'react-router';
import { headerNavs } from './../navs';
import Logo from './Logo';

export default ({ width }) => {
  return (
    <Layout.Header>
      <div className="ice-admin-layout-header" style={{ width }}>
        <Logo />
        <div
          className="ice-admin-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerNavs && headerNavs.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerNavs.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    <Link {...linkProps}>
                      {nav.icon ? <Icon type={nav.icon} size="xs" /> : null}
                      {nav.text}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <a
            className="ice-admin-layout-header-userpannel"
            style={{
              marginLeft: 45,
              marginRight: 20,
              display: 'flex',
              alignItems: 'center',
            }}
            href="https://www.taobao.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IceImg
              height={40}
              width={40}
              src="https://gw.alicdn.com/tfs/TB13ENCnwDD8KJjy0FdXXcjvXXa-192-192.png"
              style={{ marginRight: '12px', borderRadius: 8 }}
            />
            <span className="ice-admin-layout-header-username">淘小宝</span>
          </a>
        </div>
      </div>
    </Layout.Header>
  );
};
