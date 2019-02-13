import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Balloon, Icon, Nav } from '@alifd/next';
import IceImg from '@icedesign/img';
import { headerMenuConfig } from '../../../../menuConfig';
import Logo from '../Logo';
import './index.scss';

const NavItem = Nav.Item;
const SubNav = Nav.SubNav;

@withRouter
export default class Header extends Component {
  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <div className="header-container">
        <Logo isDark />
        <div className="header-navbar">
          <Nav
            className="header-navbar-menu"
            selectedKeys={[pathname]}
            defaultSelectedKeys={[pathname]}
            direction="hoz"
            type="secondary"
          >
            {headerMenuConfig &&
              headerMenuConfig.length > 0 &&
              headerMenuConfig.map((nav, index) => {
                if (nav.children && nav.children.length > 0) {
                  return (
                    <SubNav
                      triggerType="click"
                      key={index}
                      icon={nav.icon ? nav.icon : undefined}
                      title={nav.name}
                    >
                      {nav.children.map((item) => {
                        const linkProps = {};
                        if (item.external) {
                          if (item.newWindow) {
                            linkProps.target = '_blank';
                          }

                          linkProps.href = item.path;
                          return (
                            <NavItem key={item.path}>
                              <a {...linkProps}>
                                <span>{item.name}</span>
                              </a>
                            </NavItem>
                          );
                        }
                        linkProps.to = item.path;
                        return (
                          <NavItem key={item.path}>
                            <Link {...linkProps}>
                              <span>{item.name}</span>
                            </Link>
                          </NavItem>
                        );
                      })}
                    </SubNav>
                  );
                }
                const linkProps = {};
                if (nav.external) {
                  if (nav.newWindow) {
                    linkProps.target = '_blank';
                  }
                  linkProps.href = nav.path;
                  return (
                    <NavItem
                      key={nav.path}
                      icon={nav.icon ? nav.icon : undefined}
                    >
                      <a {...linkProps}>{nav.name}</a>
                    </NavItem>
                  );
                }
                linkProps.to = nav.path;
                return (
                  <NavItem
                    key={nav.path}
                    icon={nav.icon ? nav.icon : undefined}
                  >
                    <Link {...linkProps}>{nav.name}</Link>
                  </NavItem>
                );
              })}
          </Nav>
          <Balloon
            triggerType="hover"
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
                  src={require('./images/avatar.png')}
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    淘小宝
                  </span>
                  <br />
                  <span className="user-department">技术部</span>
                </div>
                <Icon type="arrow-down" size="xxs" className="icon-down" />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/user/login">
                  <Icon type="upload" size="xs" />
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
