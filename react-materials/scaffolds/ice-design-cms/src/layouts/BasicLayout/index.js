/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { withRouter } from 'react-router';

import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import MainRoutes from './MainRoutes';
import './scss/index.scss';

@withRouter
export default class BasicLayout extends Component {
  render() {
    const layoutClassName = 'ice-design-layout';

    return (
      <div className={layoutClassName}>
        <Layout>
          <Header />
          <Layout.Section scrollable>
            <Layout.Aside>
              <Aside />
            </Layout.Aside>
            <Layout.Main>
              <MainRoutes />
            </Layout.Main>
          </Layout.Section>

          <Footer />
        </Layout>
      </div>
    );
  }
}
