import React from 'react';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import { Icon, Balloon } from '@icedesign/base';
import { Link, withRouter } from 'react-router-dom';
import headerNavs from './const';
import menuConfig from '../../menuConfig';
import Logo from '../Logo';
import './Header.scss';

@withRouter
class Header extends React.Component {
  getSelectKeys() {
    const selectKeys = this.props.location.pathname.split('/').filter(i => i);
    if (selectKeys.length === 0) {
      selectKeys.push('home');
    }
    return selectKeys;
  }

  static renderHeaderTop() {
    const trigger = (
      <div
        className="ice-header-userpannel"
      >
        <span className="ice-header-username">淘小宝</span>
        <span>
          <Icon className="header-menu-arrow" size="xs" type="arrow-down" />
        </span>
      </div>
    );

    return (
      <div className="ice-admin-layout-header-top">
        <span>欢迎来到运营平台</span>
        <div
          style={{ display: 'flex' }}
        >
          {headerNavs && headerNavs.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerNavs.map((nav, idx) => {
                const linkProps = {};
                let Com = 'label';
                if (nav.external) {
                  linkProps.href = nav.to;
                  linkProps.target = nav.newWindow ? '_blank' : '_self';
                  Com = 'a';
                } else {
                  linkProps.to = nav.to;
                  Com = Link;
                }
                return (
                  <Menu.Item key={idx}>
                    <Com {...linkProps}>
                      {nav.icon ? <Icon type={nav.icon} size="xs" /> : null}
                      {nav.text}
                    </Com>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          <Balloon
            triggerType="click"
            trigger={trigger}
            align="br"
            alignment="edge"
            closable={false}
            className="ice-header-balloon"
          >
            <Menu className="ice-header-personal-menu">
              <Menu.Item>个人中心</Menu.Item>
              <Menu.Item>购物车</Menu.Item>
            </Menu>
          </Balloon>
        </div>
      </div>
    );
  }

  renderHeader() {
    const selectedKeys = this.getSelectKeys();

    return (
      <div className="ice-admin-layout-header">
        <Logo />
        {menuConfig && menuConfig.length > 0 ? (
          <Menu mode="horizontal" selectedKeys={selectedKeys}>
            {menuConfig.map((nav) => {
              return (
                <Menu.Item key={nav.path.replace(/\//g, '') || 'home'}>
                  <Link to={nav.path} >
                    {nav.name}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
          ) : null}
      </div>
    );
  }

  render() {
    return (
      <Layout.Header>
        <div style={{ width: '100%' }}>
          {Header.renderHeaderTop()}
          {this.renderHeader()}
        </div>
      </Layout.Header>
    );
  }
}

export default Header;
