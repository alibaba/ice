import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import MainRoutes from './MainRoutes';
import './index.scss';

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout
        fixable
        style={{ minHeight: '100vh' }}
        className="basic-layout-dark ice-design-layout"
      >
        <Header />

        <Layout.Section>
          <Layout.Aside width={72}>
            <Aside />
          </Layout.Aside>

          <Layout.Main scrollable>
            <MainRoutes />
            <Footer />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
