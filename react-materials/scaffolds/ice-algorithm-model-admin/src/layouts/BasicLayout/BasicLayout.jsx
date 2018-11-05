import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Footer from './components/Footer';

import './BasicLayout.scss';

export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout className="basic-layout">
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
