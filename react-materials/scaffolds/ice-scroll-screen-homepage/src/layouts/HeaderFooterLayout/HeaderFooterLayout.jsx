import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default class HeaderFooterLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout style={styles.container}>
        <Header />
        {this.props.children}
        <Footer />
      </Layout>
    );
  }
}

const styles = {
  container: {
    minWidth: '1200px',
    background: '#fff',
  },
};
