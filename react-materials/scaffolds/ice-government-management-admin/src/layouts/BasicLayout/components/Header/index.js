import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Balloon, Icon, Message, Nav } from '@alifd/next';

import IceImg from '@icedesign/img';
import { headerMenuConfig } from '../../../../menuConfig';
import Logo from '../Logo';
import './index.scss';

const {Item, Group} = Nav;

@withRouter
export default class Header extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 默认重定向到主页
   */
  handleClick = (selectedKeys) => {
    const { history } = this.props;
    if (selectedKeys.key !== '/') {
      Message.success('可以使用 Iceworks 按需添加页面');
      history.push('/');
    }
  };

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <div className="header-container">
        <Logo isDark />
        <div className="header-navbar">
          <Nav
            className="header-navbar-menu"
            selectedKeys={[pathname]}
            defaultSelectedKeys={[pathname]}
            direction="hoz"
            type="primary"
            onClick={this.handleClick}
          >
            {headerMenuConfig &&
              headerMenuConfig.length > 0 &&
              headerMenuConfig.map((nav, index) => {
                if (nav.children && nav.children.length > 0) {
                  return (
                    <Item
                      triggerType="click"
                      key={index}
                      title={
                        <span>
                          {nav.icon ? (
                            <Icon size="small" type={nav.icon} />
                          ) : null}
                          <span>{nav.name}</span>
                        </span>
                      }
                    >
                      {nav.children.map((item) => {
                        const linkProps = {};
                        if (item.external) {
                          if (item.newWindow) {
                            linkProps.target = '_blank';
                          }

                          linkProps.href = item.path;
                          return (
                            <Item key={item.path}>
                              <a {...linkProps}>
                                <span>{item.name}</span>
                              </a>
                            </Item>
                          );
                        }
                        linkProps.to = item.path;
                        return (
                          <Item key={item.path}>
                            <Link {...linkProps}>
                              <span>{item.name}</span>
                            </Link>
                          </Item>
                        );
                      })}
                    </Item>
                  );
                }
                const linkProps = {};
                if (nav.external) {
                  if (nav.newWindow) {
                    linkProps.target = '_blank';
                  }
                  linkProps.href = nav.path;
                  return (
                    <Item key={nav.path}>
                      <a {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <Icon size="small" type={nav.icon} />
                          ) : null}
                          {nav.name}
                        </span>
                      </a>
                    </Item>
                  );
                }
                linkProps.to = nav.path;
                return (
                  <Item key={nav.path}>
                    <Link {...linkProps}>
                      <span>
                        {nav.icon ? (
                          <Icon size="small" type={nav.icon} />
                        ) : null}
                        {nav.name}
                      </span>
                    </Link>
                  </Item>
                );
              })}
          </Nav>
          <Balloon
            triggerType="hover"
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <IceImg
                  height={40}
                  width={40}
                  src={require('./images/avatar.png')}
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    淘小宝
                  </span>
                  <br />
                  <span className="user-department">技术部</span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/user/login">
                  <Icon type="compass" size="small" />
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
