import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from '@alifd/next';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import FoundationSymbol from '@icedesign/foundation-symbol';
import cx from 'classnames';
import { asideMenuConfig } from '../../../../menuConfig';

@withRouter
export default class Aside extends PureComponent {

  static propTypes = {
  };

  static defaultProps = {
  };

  state = {
    collapse: false,
  };

  toggleCollapse = () => {
    const { collapse } = this.state;

    this.setState({
      collapse: !collapse,
    });
  };

  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <div
        className={cx('ice-design-layout-aside', {
          'open-drawer': this.state.openDrawer,
        })}
      >
        <a className="collapse-btn" onClick={this.toggleCollapse}>
          <Icon
            type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
            size="small"
          />
        </a>

        <Menu
          style={{ width: this.state.collapse ? 60 : 240 }}
          inlineCollapsed={this.state.collapse}
          mode="inline"
          selectedKeys={[pathname]}
          defaultSelectedKeys={[pathname]}
        >
          {Array.isArray(asideMenuConfig) &&
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
                      <span className="ice-menu-collapse-hide">
                        {nav.name}
                      </span>
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
