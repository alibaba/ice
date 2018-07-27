import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Aside from '../../components/Aside';
import Footer from '../../components/Footer';

export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout style={styles.wrapper}>
        <div style={styles.container}>
          <Aside />
          <div style={styles.content}>{this.props.children}</div>
        </div>
        <Footer />
      </Layout>
    );
  }
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#262930',
  },
  container: {
    display: 'flex',
    width: '1200px',
    paddingTop: '40px',
    margin: '0 auto',
  },
  content: {
    width: '100%',
    padding: '0 0 0 40px',
  },
};
