import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import MainRoutes from './MainRoutes';

export default class CustomLayout extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Header />

        <Layout.Section className="ice-admin-layout-body">
          <Layout.Main>
            <MainRoutes />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
    minWidth: '1280px',
  },
};
