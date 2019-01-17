import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Balloon, Nav } from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';
import IceImg from '@icedesign/img';
import { headerMenuConfig } from '../../../../menuConfig';
import styles from './index.module.scss';

@withRouter
export default class Header extends Component {

  renderNavItem = (nav) => {
    const linkProps = {};
    linkProps.to = nav.path;

    if (nav.newWindow) {
      linkProps.target = '_blank';
    }

    return (
      <Nav.Item key={nav.path}>
        <Link {...linkProps}>
          <span>
            {nav.icon ? (
              <FoundationSymbol
                size="small"
                type={nav.icon}
                className={styles.navItemIcon}
              />
            ) : null}
            {nav.name}
          </span>
        </Link>
      </Nav.Item>
    );
  }

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;

    return (
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logo}>
          资产管理系统
        </Link>
        <div className={styles.navContainer}>
          <Nav
            type="primary"
            direction="hoz"
            selectedKeys={[pathname]}
          >
            {
              (headerMenuConfig || []).map(this.renderNavItem)
            }
          </Nav>

          <Balloon
            closable={false}
            trigger={
              <div className={styles.userPanel}>
                <IceImg
                  height={40}
                  width={40}
                  src={require('./images/avatar.png')}
                  className={styles.userAvatar}
                />
                <div className={styles.userProfile}>
                  <span className={styles.username}>淘小宝</span>
                  <br />
                  <span>技术部</span>
                </div>
                <FoundationSymbol type="down" size="xxs" className={styles.iconDown} />
              </div>
            }
          >
            <ul>
              <li className={styles.userMenuItem}>
                <Link to="/account/setting">
                  <FoundationSymbol type="repair" size="small" className={styles.userMenuItemIcon} />
                  设置
                </Link>
              </li>
              <li className={styles.userMenuItem}>
                <Link to="/user/login">
                  <FoundationSymbol type="compass" size="small" className={styles.userMenuItemIcon} />
                  退出
                </Link>
              </li>
            </ul>
          </Balloon>
        </div>
      </div>
    );
  }
}
