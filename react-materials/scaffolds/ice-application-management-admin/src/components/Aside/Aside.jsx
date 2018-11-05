/* eslint no-unused-expressions:0 */
import React, { Component } from 'react';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link, withRouter } from 'react-router-dom';
import { asideMenuConfig } from '../../menuConfig';

@withRouter
export default class Aside extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <Menu selectedKeys={[pathname]} mode="inline" className="ice-menu-custom">
        {asideMenuConfig &&
          asideMenuConfig.length > 0 &&
          asideMenuConfig.map((nav, index) => {
            if (nav.children && nav.children.length > 0) {
              return (
                <SubMenu key={index} title={<span>{nav.name}</span>}>
                  {nav.children.map((item) => {
                    const linkProps = {};
                    if (item.newWindow) {
                      linkProps.href = item.path;
                      linkProps.target = '_blank';
                    } else if (item.external) {
                      linkProps.href = item.path;
                    } else {
                      linkProps.to = item.path;
                    }
                    return (
                      <MenuItem key={item.path}>
                        <Link {...linkProps}>{item.name}</Link>
                      </MenuItem>
                    );
                  })}
                </SubMenu>
              );
            }
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
              <MenuItem key={nav.path}>
                <Link {...linkProps}>
                  <span>{nav.name}</span>
                </Link>
              </MenuItem>
            );
          })}
      </Menu>
    );
  }
}
