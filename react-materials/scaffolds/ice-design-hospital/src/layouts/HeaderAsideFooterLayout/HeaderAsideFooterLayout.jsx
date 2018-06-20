import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class HeaderAsideFooterLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <div style={styles.mainContent}>{this.props.children}</div>
        <Footer />
      </Layout>
    );
  }
}

const styles = {
  mainContent: {
    marginTop: '62px',
    padding: '0 20px',
  },
};
