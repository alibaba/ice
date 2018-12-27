import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Footer from './components/Footer';
import MainRoutes from './MainRoutes';
import './index.scss';

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout className="basic-layout">
        <Header />
        <div style={styles.mainContent}>
          <MainRoutes />
        </div>
        <Footer />
      </Layout>
    );
  }
}

const styles = {
  mainContent: {
    marginTop: '82px',
    padding: '0 20px',
  },
};
