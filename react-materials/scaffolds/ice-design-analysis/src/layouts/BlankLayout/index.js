import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import MainRoutes from './MainRoutes';

export default class BlankLayout extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <MainRoutes />
      </Layout>
    );
  }
}

const styles = {
  container: {
    minHeight: '100vh',
  },
};
