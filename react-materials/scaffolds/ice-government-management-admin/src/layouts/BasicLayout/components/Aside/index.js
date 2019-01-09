/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Nav, Icon } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import { asideMenuConfig } from '../../../../menuConfig';
const {Item} = Nav;
import './index.scss';

@withRouter
export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <div className="ice-aside-custom">
        <div className="ice-aside-logo">LOGO</div>
        <Nav
          selectedKeys={[pathname]}
          className="ice-menu-custom"
        >
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav) => {
              return (
                <Item key={nav.path}>
                  <Link to={nav.path} className="ice-menu-link">
                    {nav.icon ? (
                      <Icon size="small" type={nav.icon} />
                    ) : null}
                    <span className="ice-menu-item-text">{nav.name}</span>
                  </Link>
                </Item>
              );
            })}
        </Nav>
      </div>
    );
  }
}
