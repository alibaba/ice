import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from '../../components/Header';
import Asdie from '../../components/Aside';
import Footer from '../../components/Footer';

import './BasicLayout.scss';

export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout style={{ minHeight: '100vh', background: '#eef5f7' }}>
        <Header />

        <Layout.Section>
          <Layout.Aside width={200}>
            <Asdie />
          </Layout.Aside>

          <Layout.Main scrollable>
            {this.props.children}
            <Footer />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
