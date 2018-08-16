import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './HeaderFooterLayout.scss';

export default class HeaderFooterLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout className="header-footer-layout">
        <Header />
        <div style={styles.mainContent}>{this.props.children}</div>
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
