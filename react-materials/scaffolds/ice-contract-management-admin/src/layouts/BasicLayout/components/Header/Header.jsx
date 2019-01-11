import React, { PureComponent } from 'react';
import { Balloon, Icon } from '@alifd/next';
import IceImg from '@icedesign/img';
import {Nav as Menu} from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from '../../../../menuConfig';

export default class Header extends PureComponent {
  render() {
    const { width, className, style } = this.props;

    return (
      <div
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <h1 style={{ color: 'white', margin: 0 }}>合同管理系统</h1>
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Menu direction="hoz" selectedKeys={[]}  type="secondary">
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
                return (
                  <Menu.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        <span style={{marginLeft: '1em'}}>{nav.name}</span>
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        <span style={{marginLeft: '1em'}}>{nav.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}

          <Balloon
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <IceImg
                  height={40}
                  width={40}
                  src={require('./images/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png')}
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    淘小宝
                  </span>
                  <br />
                  <span
                    className="user-department"
                    style={{ fontSize: '12px' }}
                  >
                    技术部
                  </span>
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
                <Link to="/user/login">
                  <FoundationSymbol type="compass" size="small" />
                  退出
                </Link>
              </li>
            </ul>
          </Balloon>
        </div>
      </div>
    );
  }
}
