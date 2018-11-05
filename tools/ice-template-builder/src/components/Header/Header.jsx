import React, { PureComponent } from 'react';
import { Balloon, Icon } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import Logo from '../Logo';

import './scss/dark.scss';
import './scss/light.scss';

const headerMenuConfig = [
  {
    name: '首页',
    icon: 'home',
  },
  {
    name: '反馈',
    icon: 'message',
  },
  {
    name: '帮助',
    icon: 'bangzhu',
  },
];

export default class Header extends PureComponent {
  render() {
    const { themeConfig, isMobile, className, style } = this.props;

    return (
      <Layout.Header
        theme={themeConfig.theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style }}
      >
        <Logo color={themeConfig.primaryColor} />

        <div className="ice-design-layout-header-menu">
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                return (
                  <Menu.Item key={idx}>
                    <a>
                      {nav.icon ? (
                        <FoundationSymbol type={nav.icon} size="small" />
                      ) : null}
                      {!isMobile ? nav.name : null}
                    </a>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <Balloon
            trigger={
              <div className="ice-design-header-userpannel">
                <IceImg
                  height={40}
                  width={40}
                  src={require('./images/avatar.png')}
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name">淘小宝</span>
                  <br />
                  <span className="user-department">技术部</span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <a href="#">
                  <FoundationSymbol type="person" size="small" />
                  我的主页
                </a>
              </li>
              <li className="user-profile-menu-item">
                <a href="#">
                  <FoundationSymbol type="repair" size="small" />
                  设置
                </a>
              </li>
              <li className="user-profile-menu-item">
                <a href="#">
                  <FoundationSymbol type="compass" size="small" />
                  退出
                </a>
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
