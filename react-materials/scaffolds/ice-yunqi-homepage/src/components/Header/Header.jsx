import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { headerMenuConfig } from '../../menuConfig';
import Logo from '../Logo';
import './Header.scss';

@withRouter
export default class Header extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <div className="header-container">
        <div className="header-content">
          <Logo />
          <Menu
            className="header-navbar-menu"
            onClick={this.handleNavClick}
            selectedKeys={[pathname]}
            defaultSelectedKeys={[pathname]}
            mode="horizontal"
          >
            {headerMenuConfig &&
              headerMenuConfig.length > 0 &&
              headerMenuConfig.map((nav, index) => {
                if (nav.children && nav.children.length > 0) {
                  return (
                    <SubMenu
                      triggerType="click"
                      key={index}
                      title={<span>{nav.name}</span>}
                    >
                      {nav.children.map((item) => {
                        const linkProps = {};
                        if (item.external) {
                          if (item.newWindow) {
                            linkProps.target = '_blank';
                          }

                          linkProps.href = item.path;
                          return (
                            <MenuItem key={item.path}>
                              <a {...linkProps}>
                                <span>{item.name}</span>
                              </a>
                            </MenuItem>
                          );
                        }
                        linkProps.to = item.path;
                        return (
                          <MenuItem key={item.path}>
                            <Link {...linkProps}>
                              <span>{item.name}</span>
                            </Link>
                          </MenuItem>
                        );
                      })}
                    </SubMenu>
                  );
                }
                const linkProps = {};
                if (nav.external) {
                  if (nav.newWindow) {
                    linkProps.target = '_blank';
                  }
                  linkProps.href = nav.path;
                  return (
                    <MenuItem key={nav.path}>
                      <a {...linkProps}>
                        <span>{nav.name}</span>
                      </a>
                    </MenuItem>
                  );
                }
                linkProps.to = nav.path;
                return (
                  <MenuItem key={nav.path}>
                    <Link {...linkProps}>
                      <span>{nav.name}</span>
                    </Link>
                  </MenuItem>
                );
              })}
          </Menu>
          <a href="#" className="ticket-button">
            立即购票
          </a>
        </div>
      </div>
    );
  }
}
