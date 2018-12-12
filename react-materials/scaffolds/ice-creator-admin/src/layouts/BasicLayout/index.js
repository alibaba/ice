/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import Layout from '@icedesign/layout';
import React, { Component } from 'react';
import MainRoutes from './MainRoutes';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import './index.scss';

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout style={styles.layout}>
        {/* 顶部导航  */}
        <Header />
        <Layout.Section style={styles.layoutSecion}>
          {/* 侧边导航  */}
          <Aside />
          {/* 主体内容 */}
          <Layout.Main>
            <MainRoutes />
          </Layout.Main>
        </Layout.Section>
        <Footer />
      </Layout>
    );
  }
}

const styles = {
  layoutSecion: {
    flexDirection: 'row',
    minHeight: '100vh',
  },
};
