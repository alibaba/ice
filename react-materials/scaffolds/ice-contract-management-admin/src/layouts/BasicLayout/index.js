/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import routerConfig from '../../routerConfig';
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from './components/Aside';

import './index.scss';

export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout
        fixable
        style={{ minHeight: '100vh' }}
        className="ice-design-layout"
      >
        <Layout.Header>
          <Header />
        </Layout.Header>

        <Layout.Section>
          <Layout.Aside
            width="auto"
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
