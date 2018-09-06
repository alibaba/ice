/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Menu, { Item as MenuItem } from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import { Icon } from '@icedesign/base';

import './scss/dark.scss';
import './scss/light.scss';

const asideMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'yonghu',
  },
  {
    name: '系统设置',
    path: '/setting',
    icon: 'shezhi',
  },
];

export default class Aside extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const { layoutConfig = {} } = this.props;
    const { collapsed } = layoutConfig.aside;
    this.state = {
      collapsed,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { layoutConfig = {} } = nextProps;
    const { collapsed } = layoutConfig.aside;
    if (collapsed !== this.state.collapsed) {
      this.setState({
        collapsed,
      });
    }
  }

  /**
   * 左侧菜单收缩切换
   */
  toggleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  render() {
    const { layoutConfig = {} } = this.props;
    const { themeConfig } = layoutConfig;
    return (
      <div className="ice-design-layout-aside">
        <a className="collapse-btn" onClick={this.toggleCollapse}>
          <Icon
            type={this.state.collapsed ? 'arrow-right' : 'arrow-left'}
            size="small"
          />
        </a>

        <Menu
          style={{ width: this.state.collapsed ? 60 : 200 }}
          inlineCollapsed={this.state.collapsed}
          mode="inline"
          openKeys={['0']}
          defaultSelectedKeys={['/']}
        >
          {asideMenuConfig &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav, index) => {
              const selected =
                index === 0
                  ? {
                      borderRadius: '6px',
                      background: `${themeConfig.primaryColor}`,
                    }
                  : {};
              return (
                <MenuItem key={nav.path} style={{ ...selected }}>
                  <a>
                    <span>
                      {nav.icon ? (
                        <FoundationSymbol size="small" type={nav.icon} />
                      ) : null}
                      <span className="ice-menu-collapse-hide">{nav.name}</span>
                    </span>
                  </a>
                </MenuItem>
              );
            })}
        </Menu>
      </div>
    );
  }
}
