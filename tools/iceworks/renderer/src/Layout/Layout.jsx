import cx from 'classnames';
import DocumentTitle from 'react-document-title';
import Layout from '@icedesign/layout';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';

import { openInBrowser } from '../external';
import Icon from '../components/Icon';
import Link from '../components/Link';
import User from '../components/User';
import services from '../services';

const { settings } = services;

import './Layout.scss';

const ASIDE_WIDTH = 68;

class SidebarLayout extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  static defaultProps = {
    // 业务替换为自己的页面标题
    title: 'Iceworks',
  };

  handleOpenHelp = () => {
    openInBrowser('https://github.com/alibaba/ice/issues/new?labels=iceworks');
  };

  renderHelpIcon() {
    return (
      <Tooltip placement="right" overlay={<span>反馈问题</span>}>
        <div onClick={this.handleOpenHelp} className="iceworks-help-menu">
          <Icon type="help" size="large" />
          <span style={{ paddingTop: '4px' }}>帮助</span>
        </div>
      </Tooltip>
    );
  }

  render() {
    const { title, className } = this.props;
    const isAlibaba = settings.get('isAlibaba');
    return (
      <DocumentTitle title={title}>
        <Layout
          fixable={true}
          style={{ minHeight: '100vh' }}
          className={cx(
            {
              'ice-admin__layout': true,
              'iceworks-layout': true,
            },
            className
          )}
        >
          <Layout.Section className="ice-admin__layout__body">
            <Layout.Aside width={ASIDE_WIDTH} className="iceworks-aside">
              <div className="iceworks-menu">
                <ul>
                  <li>
                    <Link onlyActiveOnIndex activeClassName="active" to="/">
                      <Icon
                        className="menu-icon"
                        size="small"
                        type="projects"
                      />
                      <span className="menu-tip">项目</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onlyActiveOnIndex
                      activeClassName="active"
                      to="scaffolds"
                    >
                      <Icon
                        className="menu-icon"
                        size="small"
                        type="template"
                      />
                      <span className="menu-tip">模板</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onlyActiveOnIndex
                      activeClassName="active"
                      to="blocks"
                    >
                      <Icon className="menu-icon" size="small" type="blocks" />
                      <span className="menu-tip">区块</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onlyActiveOnIndex
                      activeClassName="active"
                      to="extensions"
                    >
                      <Icon className="menu-icon" size="small" type="puzzle" />
                      <span className="menu-tip">插件</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onlyActiveOnIndex
                      activeClassName="active"
                      to="settings"
                    >
                      <Icon
                        className="menu-icon"
                        size="small"
                        type="settings"
                      />
                      <span className="menu-tip">设置</span>
                    </Link>
                  </li>
                </ul>
              </div>
              {isAlibaba && <User />}
            </Layout.Aside>
            {/* 主体内容 */}
            <Layout.Main>{this.props.children}</Layout.Main>
          </Layout.Section>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default SidebarLayout;
