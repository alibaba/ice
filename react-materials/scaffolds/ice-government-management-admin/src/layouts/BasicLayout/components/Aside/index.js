/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Nav } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import { asideMenuConfig } from '../../../../menuConfig';
const {Item} = Nav;

import styleNames from './index.module.scss';
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
      <div className={styleNames.iceAsideCustom}>
        <div className={styleNames.iceAsideLogo}>LOGO</div>
        <Nav
          className={styleNames.iceNav}
          selectedKeys={[pathname]}>
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav) => {
              return (
                <Item key={nav.path} icon={nav.icon}>
                  <Link to={nav.path} >
                    <span className={styleNames.iceMenuLinkText}>{nav.name}</span>
                  </Link>
                </Item>
              );
            })}
        </Nav>
      </div>
    );
  }
}
