import React, { Component } from 'react';
import {Nav} from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { asideMenuConfig } from '../../../../menuConfig';

import './Aside.scss';

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
      <Nav selectedKeys={[pathname]} className="ice-menu-custom">
        {Array.isArray(asideMenuConfig) &&
          asideMenuConfig.length > 0 &&
          asideMenuConfig.map((nav) => {
            return (
              <Nav.Item key={nav.path}>
                <Link to={nav.path} className="ice-menu-link">
                  {nav.icon ? (
                    <FoundationSymbol size="small" type={nav.icon} />
                  ) : null}
                  <span className="ice-menu-item-text">{nav.name}</span>
                </Link>
              </Nav.Item>
            );
          })}
      </Nav>
    );
  }
}
