/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Nav, Icon } from '@alifd/next';
import cls from 'classname';
import { asideMenuConfig } from '../../../../menuConfig';
import styles from './index.module.scss';

@withRouter
export default class Aside extends Component {

  state = {
    collapse: false,
  }

  toggleCollapse = () => {
    const { collapse } = this.state;

    this.setState({
      collapse: !collapse,
    });
  }

  renderNavItem = (nav) => {
    const linkProps = {};
    linkProps.to = nav.path;

    if (nav.newWindow) {
      linkProps.target = '_blank';
    }

    return (
      <Nav.Item key={nav.path} icon={nav.icon}>
        <Link {...linkProps}>{nav.name}</Link>
      </Nav.Item>
    );
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;
    const { collapse } = this.state;

    const className = cls(styles.aside, {
      [styles.asideCollapsed]: collapse,
    });

    return (
      <div className={className}>
        <div className={styles.collapseBtn} onClick={this.toggleCollapse}>
          <Icon
            type={collapse ? 'arrow-right' : 'arrow-left'}
            size="small"
          />
        </div>
        <Nav
          type="primary"
          direction="ver"
          iconOnly={collapse}
          hasTooltip
          selectedKeys={[pathname]}
        >
          {(asideMenuConfig || []).map((nav, index) => {
              if (nav.children && nav.children.length > 0) {
                return (
                  <Nav.SubNav
                    key={index}
                    icon={nav.icon}
                    label={nav.name}
                  >
                    {nav.children.map(this.renderNavItem)}
                  </Nav.SubNav>
                );
              }
              return this.renderNavItem(nav);
            })}
        </Nav>
        {/* 侧边菜单项 end */}
      </div>
    );
  }
}
