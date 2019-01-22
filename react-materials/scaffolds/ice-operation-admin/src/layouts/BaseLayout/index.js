import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import MainRoutes from './MainRoutes';
import styles from './index.module.scss';

export default class CustomLayout extends Component {
  render() {
    return (
      <Layout className={styles.container}>
        <Header />
        <Layout.Section>
          <Layout.Main className={styles.main}>
            <MainRoutes />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
