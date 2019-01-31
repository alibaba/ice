import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav } from '@alifd/next';
import headerMenuConfig from '../../../../menuConfig';
import './NavBar.scss';

const NavItem = Nav.Item;
const SubNav = Nav.SubNav;

@withRouter
export default class Header extends Component {
  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <Nav
        className="header-navbar-menu"
        onClick={this.handleNavClick}
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        direction="hoz"
      >
        {headerMenuConfig &&
          headerMenuConfig.length > 0 &&
          headerMenuConfig.map((nav, index) => {
            if (nav.children && nav.children.length > 0) {
              return (
                <SubNav
                  key={index}
                  icon={nav.icon ? nav.icon : null}
                  label={nav.name}
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
                <NavItem key={nav.path} icon={nav.icon ? nav.icon : null}>
                  <a {...linkProps}>{nav.name}</a>
                </NavItem>
              );
            }
            linkProps.to = nav.path;
            return (
              <NavItem key={nav.path} icon={nav.icon ? nav.icon : null}>
                <Link {...linkProps}>{nav.name}</Link>
              </NavItem>
            );
          })}
      </Nav>
    );
  }
}
