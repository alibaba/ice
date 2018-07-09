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

  /**
   * 当前展开的菜单项
   */
  getOpenKeys = () => {
    const { match } = this.props;
    const matched = match.path;
    let openKeys = [];

    Array.isArray(asideMenuConfig) &&
      asideMenuConfig.forEach((item, index) => {
        if (matched.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });

    return openKeys;
  };

  /**
   * 点击菜单项触发的事件，模板默认点击菜单都跳转首页
   * 实际业务开发按需处理
   */
  onMenuClick = (selectedKeys) => {
    if (selectedKeys !== '/') {
      this.props.history.push('/');
    }
  };

  render() {
    const { location } = this.props;
    const { pathname } = location;

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
          selectedKeys={[pathname]}
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[`${this.getOpenKeys()}`]}
          mode="inline"
        >
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
      </div>
    );
  }
}
