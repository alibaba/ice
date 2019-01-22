import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import MainRoutes from './MainRoutes';
import style from './index.module.scss';

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout fixable className={style.iceLayout}>
        <Layout.Section>
          <Layout.Aside>
            <Aside />
          </Layout.Aside>
          <Layout.Main scrollable>
            <Layout.Header type="secondary">
              <Header />
            </Layout.Header>
            <div className="main-container">
              <MainRoutes />
            </div>
            <Footer />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
