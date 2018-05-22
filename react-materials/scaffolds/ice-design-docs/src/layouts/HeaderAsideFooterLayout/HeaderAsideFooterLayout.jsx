import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from '../../components/Header';
import Asdie from '../../components/Aside';
import Footer from '../../components/Footer';

export default class HeaderAsideFooterLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header />

        <div style={styles.wrapper}>
          <div style={styles.container}>
            <div style={styles.aside}>
              <Asdie />
            </div>

            <div style={styles.content}>{this.props.children}</div>
          </div>
        </div>

        <Footer />
      </Layout>
    );
  }
}

const styles = {
  wrapper: {
    margin: '93px 0 40px',
  },
  container: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  aside: {
    position: 'fixed',
    width: '256px',
  },
  content: {
    width: '100%',
    marginLeft: '256px',
    padding: '0 0 0 54px',
  },
};
