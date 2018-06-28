import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon, Menu } from '@icedesign/base';
import { withRouter, Link } from 'react-router-dom';
import Header from '../../components/Header';
import asideNavs from './const';
import './Layout.scss';

const { Item: MenuItem, SubMenu } = Menu;

@withRouter
export default class CustomLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isExtend: true
    };
  }

  // 当前打开的菜单项
  getOpenKeys = () => {
    const { routes } = this.props;
    const matched = routes[0].path;
    let openKeys = '';

    if (asideNavs && asideNavs.length > 0) {
      asideNavs.forEach((item, index) => {
        if (item.to === matched) {
          openKeys = index;
        }
      });
    }

    return openKeys;
  };

  onClickExpand = () => {
    this.setState({
      isExtend: !this.state.isExtend
    });
  };

  getSelectKeys() {
    const selectKeys = this.props.location.pathname.split('/').filter(i => i);
    if (selectKeys.length === 0) {
      selectKeys.push('home');
    }
    return selectKeys;
  }

  getMenuItems(navs) {
    const selectKeys = this.getSelectKeys();
    const { isExtend } = this.state;
    function recursion(config) {
      return config.map((item) => {
        const { children, icon, text, external, key, to, newWindow } = item;
        const iconCls = {
          'ice-aside-icon': isExtend,
          'ice-aside-icon-collapse': !isExtend
        };
        const label = (
          <span>
            {icon ? <Icon className={cx(iconCls)} size="xs" type={icon} /> : null}
            { isExtend && <span>{text}</span> }
          </span>
        );
        if (isExtend && Array.isArray(children) && children.length > 0) {
          return (
            <SubMenu key={key} label={label}>
              {recursion(children)}
            </SubMenu>
          );
        }
        const linkProps = {};
        let Com = 'label';
        if (external) {
          linkProps.href = to;
          linkProps.target = newWindow ? '_blank' : '_self';
          Com = 'a';
        } else if (to) {
          linkProps.to = to;
          Com = Link;
        }

        return (
          <MenuItem key={key} hasSelectedIcon={false} selected={selectKeys.indexOf(key) > -1}>
            <Com {...linkProps}>
              {label}
            </Com>
          </MenuItem>
        );
      });
    }

    return recursion(navs);
  }

  render() {
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className="ice-admin-aside-layout"
      >
        <Header />

        <Layout.Section className="ice-admin-layout-body">
          <Layout.Main>{this.props.children}</Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
