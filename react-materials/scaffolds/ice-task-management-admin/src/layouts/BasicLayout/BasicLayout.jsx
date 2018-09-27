import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Header from '../../components/Header';
import Aside from '../../components/Aside';
import Footer from '../../components/Footer';

import './BasicLayout.scss';

const theme = 'dark';

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout
        fixable
        style={{ minHeight: '100vh' }}
        className={cx(`basic-layout-${theme} ice-design-layout`)}
      >
        <Header theme={theme} />

        <Layout.Section>
          <Layout.Aside width={72}>
            <Aside />
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
