/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import routerConfig from '../../routerConfig';
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from './components/Aside';
import './scss/dark.scss';

const theme = 'dark';

export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout
        fixable
        style={{ minHeight: '100vh' }}
        className={`basic-layout-${theme} ice-design-layout`}
      >
        <Layout.Header
          theme={theme}
        >
          <Header />
        </Layout.Header>

        <Layout.Section>
          <Layout.Aside
            width="auto"
            theme={theme}
          >
            <Aside />
          </Layout.Aside>

          {/* 主体内容 */}
          <Layout.Main scrollable>
            <Switch>
              {routerConfig.map((item, index) => {
                return item.component ? (
                  <Route
                    key={index}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                ) : null;
              })}
              <Redirect from="/" to="/contract" />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
