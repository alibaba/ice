/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, { Component } from 'react';
import { Balloon, Nav } from '@alifd/next';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import FoundationSymbol from '@icedesign/foundation-symbol';
import cx from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { headerMenuConfig } from '../../../../menuConfig';
import SelectLang from '../../../../components/SelectLang';
import Logo from '../Logo';

import './index.scss';

@injectIntl
@withRouter
export default class Header extends Component {
  handleSetting = () => {
    this.props.history.push('/account/setting');
  };

  getLocaleKey = (item) => {
    return `app.header.${item.name}`;
  };

  render() {
    const {
      isMobile,
      className,
      style,
      intl: { formatMessage },
    } = this.props;
    console.log(this.props);

    return (
      <Layout.Header
        theme="dark"
        className={cx('ice-design-layout-header', className)}
        style={{ ...style }}
      >
        <Logo />

        <div className="ice-design-layout-header-menu">
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Nav direction="hoz" type="secondary" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
                const name = formatMessage({ id: this.getLocaleKey(nav) });
                return (
                  <Nav.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}{' '}
                        {!isMobile ? name : null}
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}{' '}
                        {!isMobile ? name : null}
                      </a>
                    )}
                  </Nav.Item>
                );
              })}
            </Nav>
          ) : null}
          {/* Header 菜单项 end */}

          {/* 多语言选择 */}
          <SelectLang />

          {/* Header 右侧内容块 */}
          <Balloon
            trigger={
              <div className="ice-design-header-userpannel">
                <IceImg
                  height={40}
                  width={40}
                  src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name">
                    <FormattedMessage id="app.header.user.name" />
                  </span>
                  <br />
                  <span className="user-department">
                    <FormattedMessage id="app.header.user.department" />
                  </span>
                </div>
                <FoundationSymbol
                  type="angle-down"
                  size="small"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li
                className="user-profile-menu-item"
                onClick={this.handleSetting}
              >
                <FoundationSymbol type="repair" size="small" />
                <FormattedMessage id="app.header.user.setting" />
              </li>
              <li
                className="user-profile-menu-item"
                onClick={this.props.handleLogout}
              >
                <FoundationSymbol type="person" size="small" />
                <FormattedMessage id="app.header.user.logout" />
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
