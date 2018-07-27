/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { enquire } from 'enquire-js';
import { withRouter } from 'react-router';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import cx from 'classnames';
import FoundationSymbol from 'foundation-symbol';
import { Icon } from '@icedesign/base';
import Logo from '../Logo';
import { asideMenuConfig } from '../../../../menuConfig';

import './scss/dark.scss';
import './scss/light.scss';
@withRouter
export default class Aside extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getOpenKeys();
    this.state = {
      collapse: props.collapse,
      openDrawer: false,
      openKeys,
    };
    this.openKeysCache = openKeys;
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          collapse,
        });
      },
      unmatch: () => {
        // handler unmatched
      },
    };

    return handler;
  };

  /**
   * 左侧菜单收缩切换
   */
  toggleCollapse = () => {
    const { collapse } = this.state;
    const openKeys = !collapse ? [] : this.openKeysCache;

    this.setState({
      collapse: !collapse,
      openKeys,
    });
  };

  /**
   * 响应式通过抽屉形式切换菜单
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  /**
   * 响应式时点击菜单进行切换
   */
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 获取当前展开的菜单项
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

  render() {
    const { openDrawer } = this.state;
    const {
      location: { pathname },
      isMobile,
    } = this.props;

    return (
      <div
        className={cx('ice-design-layout-aside', { 'open-drawer': openDrawer })}
      >
        {isMobile && <Logo />}

        {isMobile &&
          !openDrawer && (
            <a className="menu-btn" onClick={this.toggleMenu}>
              <Icon type="category" size="small" />
            </a>
          )}

        {!isMobile && (
          <a className="collapse-btn" onClick={this.toggleCollapse}>
            <Icon
              type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
              size="small"
            />
          </a>
        )}

        <Menu
          style={{ width: this.state.collapse ? 60 : 200 }}
          inlineCollapsed={this.state.collapse}
          mode="inline"
          selectedKeys={[pathname]}
          openKeys={this.state.openKeys}
          defaultSelectedKeys={[pathname]}
          onOpenChange={this.onOpenChange}
          onClick={this.onMenuClick}
        >
          {asideMenuConfig &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav, index) => {
              if (nav.children && nav.children.length > 0) {
                return (
                  <SubMenu
                    key={index}
                    title={
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol size="small" type={nav.icon} />
                        ) : null}
                        <span className="ice-menu-collapse-hide">
                          {nav.name}
                        </span>
                      </span>
                    }
                  >
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
                    <span>
                      {nav.icon ? (
                        <FoundationSymbol size="small" type={nav.icon} />
                      ) : null}
                      <span className="ice-menu-collapse-hide">{nav.name}</span>
                    </span>
                  </Link>
                </MenuItem>
              );
            })}
        </Menu>
      </div>
    );
  }
}
