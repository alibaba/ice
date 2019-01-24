import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Balloon, Icon, Nav } from '@alifd/next';
import IceImg from '@icedesign/img';
import { headerMenuConfig } from '../../../../menuConfig';
import Logo from '../Logo';
import './Header.scss';

const NavItem = Nav.Item;

@withRouter
export default class Header extends Component {
  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <div className="header-container">
        <div className="header-content">
          <Logo isDark />
          <div className="header-navbar">
            <Nav
              className="header-navbar-menu"
              onClick={this.handleNavClick}
              selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              direction="hoz"
              activeDirection={null}
            >
              {headerMenuConfig &&
                headerMenuConfig.length > 0 &&
                headerMenuConfig.map((nav) => {
                  const linkProps = {};
                  if (nav.external) {
                    if (nav.newWindow) {
                      linkProps.target = '_blank';
                    }
                    linkProps.href = nav.path;
                    return (
                      <NavItem key={nav.path} icon={nav.icon ? nav.icon : null}>
                        <a {...linkProps}>
                          <span>{nav.name}</span>
                        </a>
                      </NavItem>
                    );
                  }
                  linkProps.to = nav.path;
                  return (
                    <NavItem key={nav.path} nav={nav.icon ? nav.icon : null}>
                      <Link {...linkProps}>
                        <span>{nav.name}</span>
                      </Link>
                    </NavItem>
                  );
                })}
            </Nav>
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
                  <Link to="/setting">
                    <Icon type="set" size="small" />
                    设置
                  </Link>
                </li>
                <li className="user-profile-menu-item">
                  <Link to="/user/login">
                    <Icon type="upload" size="small" />
                    退出
                  </Link>
                </li>
              </ul>
            </Balloon>
          </div>
        </div>
      </div>
    );
  }
}
