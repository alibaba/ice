/* eslint no-unused-expressions:0 */
import React, { Component } from 'react';
import { Input } from '@icedesign/base';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../Logo';
import asideMenuConfig from '../../menuConfig';
import './Aside.scss';

@withRouter
export default class Aside extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="aside-content">
        <Logo style={{ marginBottom: '10px' }} />
        <Input
          placeholder="search..."
          size="large"
          style={{
            background: '#434857',
            border: '0',
            marginBottom: '20px',
          }}
        />
        <Menu
          style={{ width: 200 }}
          onClick={this.onMenuClick}
          defaultSelectedKeys={['0']}
          mode="inline"
        >
          {asideMenuConfig &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav, index) => {
              if (nav.children && nav.children.length > 0) {
                return (
                  <SubMenu key={index} title={<span>{nav.name}</span>}>
                    {nav.children.map((item, idx) => {
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
                        <MenuItem key={idx}>
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
                <MenuItem key={index}>
                  <Link {...linkProps}>
                    <span>{nav.name}</span>
                  </Link>
                </MenuItem>
              );
            })}
        </Menu>
      </div>
    );
  }
}
