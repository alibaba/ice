/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { withRouter } from 'react-router';
import { enquire } from 'enquire-js';
<% if(header) { %>
import Header from './components/Header';
<% } %>

<% if(aside) { %>
import Aside from './components/Aside';
<% } %>

<% if(footer) { %>
import Footer from './components/Footer';
<% } %>

<% if(redux.enabled && redux.registerLoginModule) { %>
import BasicLayoutHoc from './BasicLayoutHoc';
<% } %>

<% if(aside) { %>
import MainRoutes from './MainRoutes';
<% } %>

import './scss/index.scss';

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = '<%= themeConfig.theme %>';

@withRouter
export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isScreen: undefined,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
        });
      },
    };

    return handler;
  };

  render() {
    const isMobile = this.state.isScreen !== 'isDesktop';
    const layoutClassName = `ice-design-layout-${theme} ice-design-layout ice-design-<%= layout %>`;

    <% if(header) { %>
      const header = <Header theme={theme} isMobile={isMobile} />;
    <% } %>

    <% if(aside) { %>
    const aside = (
      <Layout.Aside theme={theme} width="auto">
        <Aside isMobile={isMobile} />
      </Layout.Aside>
    );
    <% } %>

    <% if(footer) { %>
      const footer = <Footer />;
    <% } %>

    <% if(aside || redux.enabled) { %>
      const content = <MainRoutes />
    <% } else { %>
      const content  = this.props.children;
    <% } %>

    const layout = (
      <Layout
      <% if ((header && header.position === 'fixed') || (footer && footer.position === 'fixed') || (aside && aside.position === 'embed-fixed')) { %>
        fixable
      <% } %>
      >
        <% if (header && aside && footer) { %>
          <% if (header.width === 'full-width' && footer.width=== 'full-width') { %>
            {header}
            <Layout.Section <% if(aside.position !== 'embed-fixed') { %>  scrollable <% } %>>
              {aside}
              <Layout.Main <% if(aside.position === 'embed-fixed') { %>  scrollable <% } %>>{content}</Layout.Main>
            </Layout.Section>
            {footer}
          <% } else if(header.width==="elastic-width" && footer.width ==='elastic-width') { %>
            {aside}
            <% if (header.position === 'static' && footer.position === 'static') { %>
              <Layout.Section scrollable>
                <Layout.Main>{header}{content}{footer}</Layout.Main>
              </Layout.Section>
            <% } %>
            <% if (header.position === 'fixed' && footer.position === 'static') { %>
              <Layout.Section>
                {header}
                <Layout.Main scrollable>{content}{footer}</Layout.Main>
              </Layout.Section>
            <% } %>
            <% if (header.position === 'fixed' && footer.position === 'fixed') { %>
              <Layout.Section>
                {header}
                <Layout.Main scrollable>{content}</Layout.Main>
                {footer}
              </Layout.Section>
            <% } %>
          <% } else if(header.width==="full-width" && footer.width ==='elastic-width') { %>
            {header}
            <Layout.Section <% if(aside.position !== 'embed-fixed') { %>  scrollable <% } %>>
              {aside}
              <Layout.Main <% if(aside.position == 'embed-fixed') { %>  scrollable <% } %>>
                {content}
                {footer}
              </Layout.Main>
            </Layout.Section>
          <% } else if(header.width==="elastic-width" && footer.width ==='full-width') { %>
            <Layout.Section <% if(aside.position !== 'embed-fixed') { %>  scrollable <% } %>>
              {aside}
              <Layout.Main <% if(aside.position == 'embed-fixed') { %>  scrollable <% } %>>
                {header}
                {content}
              </Layout.Main>
            </Layout.Section>
            {footer}
          <% } %>
        <% } else if(aside && footer) { %>
          <% if (footer.width === 'full-width') { %>
            <Layout.Section <% if(aside.position !== 'embed-fixed') { %>  scrollable <% } %>>
              {aside}
              <Layout.Main <% if(aside.position == 'embed-fixed') { %>  scrollable <% } %>>{content}</Layout.Main>
            </Layout.Section>
            {footer}
          <% } else if(footer.width ==='elastic-width') { %>
            {aside}
            <Layout.Section <% if(aside.position !== 'embed-fixed') { %>  scrollable <% } %>>
              <Layout.Main <% if(aside.position == 'embed-fixed') { %>  scrollable <% } %>>{content}</Layout.Main>
              {footer}
            </Layout.Section>
          <% } %>
        <% } else if(header && aside) { %>
          <% if (header.width === 'full-width') { %>
            {header}
            <Layout.Section <% if(aside.position !== 'embed-fixed') { %>  scrollable <% } %>>
              {aside}
              <Layout.Main <% if(aside.position == 'embed-fixed') { %>  scrollable <% } %>>{content}</Layout.Main>
            </Layout.Section>
          <% } else if(header.width ==='elastic-width') { %>
            {aside}
            <Layout.Section <% if(header.position !== 'fixed') { %>  scrollable <% } %>>
              {header}
              <Layout.Main <% if(header.position == 'fixed') { %>  scrollable <% } %>>{content}</Layout.Main>
            </Layout.Section>
          <% } %>
        <% } else if(header && footer) { %>
          <% if ((header.position === 'fixed' && footer.position === 'fixed') || (header.position === 'static' && footer.position === 'static')) { %>
            <Layout.Section <% if(header.position === 'static' && footer.position === 'static') { %>  scrollable <% } %>>
              {header}
              <Layout.Main <% if(header.position === 'fixed' && footer.position === 'fixed') { %>  scrollable <% } %>>{content}</Layout.Main>
              {footer}
            </Layout.Section>
          <% } %>

          <% if (header.position === 'fixed' && footer.position === 'static') { %>
            {header}
            <Layout.Section scrollable>
              <Layout.Main>{content}</Layout.Main>
              {footer}
            </Layout.Section>
          <% } %>

          <% if (header.position === 'static' && footer.position === 'fixed') { %>
            <Layout.Section scrollable>
              {header}
              <Layout.Main>{content}</Layout.Main>
            </Layout.Section>
            {footer}
          <% } %>
        <% } else if(header) { %>
          <Layout.Section>
            {header}
            <Layout.Main scrollable>
              {content}
            </Layout.Main>
          </Layout.Section>
        <% } else if(aside) { %>
          {aside}
          <Layout.Section>
            <Layout.Main scrollable>{content}</Layout.Main>
          </Layout.Section>
        <% } else if(footer) { %>
          <Layout.Section>
            <Layout.Main scrollable>{content}</Layout.Main>
          </Layout.Section>
          {footer}
        <% } else{ %>
          <Layout.Main>{content}</Layout.Main>
        <% } %>
      </Layout>
    );

    return <div className={layoutClassName}>{layout}</div>;
  }
}
