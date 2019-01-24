/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import routerConfig from '../../routerConfig';
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from './components/Aside';
import styles from './index.module.scss';

export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout fixable className={styles.layout}>
        <Layout.Header type="secondary">
          <Header />
        </Layout.Header>

        <Layout.Section>
          <Layout.Aside>
            <Aside />
          </Layout.Aside>

          {/* 主体内容 */}
          <Layout.Main scrollable className={styles.main}>
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
              <Route component={NotFound} />
            </Switch>

            <Layout.Footer type="none">
              <Footer />
            </Layout.Footer>
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
