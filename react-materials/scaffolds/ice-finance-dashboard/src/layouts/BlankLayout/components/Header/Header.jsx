import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav } from '@alifd/next';

import FoundationSymbol from '@icedesign/foundation-symbol';
import { headerMenuConfig } from '../../../../menuConfig';
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
          <Logo isDark />
          <div className="header-navbar">
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
                      <Nav.SubNav
                        triggerType="click"
                        key={index}
                        title={
                          <span>
                            {nav.icon ? (
                              <FoundationSymbol size="small" type={nav.icon} />
                            ) : null}
                            <span>{nav.name}</span>
                          </span>
                        }
                      >
                        {nav.children.map((item) => {
                          const linkProps = {};
                          if (item.external) {
                            if (item.newWindow) {
                              linkProps.target = '_blank';
                            }

                            linkProps.href = item.path;
                            return (
                              <Nav.Item key={item.path}>
                                <a {...linkProps}>
                                  <span>{item.name}</span>
                                </a>
                              </Nav.Item>
                            );
                          }
                          linkProps.to = item.path;
                          return (
                            <Nav.Item key={item.path}>
                              <Link {...linkProps}>
                                <span>{item.name}</span>
                              </Link>
                            </Nav.Item>
                          );
                        })}
                      </Nav.SubNav>
                    );
                  }
                  const linkProps = {};
                  if (nav.external) {
                    if (nav.newWindow) {
                      linkProps.target = '_blank';
                    }
                    linkProps.href = nav.path;
                    return (
                      <Nav.Item key={nav.path}>
                        <a {...linkProps}>
                          <span>
                            {nav.icon ? (
                              <FoundationSymbol size="small" type={nav.icon} />
                            ) : null}
                            {nav.name}
                          </span>
                        </a>
                      </Nav.Item>
                    );
                  }
                  linkProps.to = nav.path;
                  return (
                    <Nav.Item key={nav.path}>
                      <Link {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          {nav.name}
                        </span>
                      </Link>
                    </Nav.Item>
                  );
                })}
            </Nav>
          </div>
        </div>
      </div>
    );
  }
}
