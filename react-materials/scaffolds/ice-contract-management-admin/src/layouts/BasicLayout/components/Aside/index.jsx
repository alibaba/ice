import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Nav } from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';
import cx from 'classnames';
import { asideMenuConfig } from '../../../../menuConfig';
import styles from './index.module.scss';

@withRouter
export default class Aside extends PureComponent {
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
    const { collapse } = this.state;
    const { pathname } = location;

    return (
      <div className={styles.asideContainer}>
        <a className={styles.collapseBtn} onClick={this.toggleCollapse}>
          <Icon
            type={collapse ? 'arrow-right' : 'arrow-left'}
            size="small"
          />
        </a>
        <Nav
          style={{ width: collapse ? 60 : 240 }}
          selectedKeys={[pathname]}
          defaultSelectedKeys={[pathname]}
        >
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav, index) => {
              if (nav.children && nav.children.length > 0) {
                return (
                  <Nav.SubNav
                    key={index}
                    title={
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol size="small" type={nav.icon} />
                        ) : null}
                        <span
                          className={cx({
                            [styles.iceMenuText]: true,
                            [styles.iceMenuCollapseHide]: collapse,
                          })}
                        >
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
                        <Nav.Item key={item.path}>
                          <Link {...linkProps}>{item.name}</Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav.SubNav>
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
                <Nav.Item key={nav.path}>
                  <Link {...linkProps}>
                    <span>
                      {nav.icon ? (
                        <FoundationSymbol size="small" type={nav.icon} />
                      ) : null}
                      <span
                        className={cx({
                          [styles.iceMenuText]: true,
                          [styles.iceMenuCollapseHide]: collapse,
                        })}
                      >
                        {nav.name}
                      </span>
                    </span>
                  </Link>
                </Nav.Item>
              );
            })}
        </Nav>
      </div>
    );
  }
}
