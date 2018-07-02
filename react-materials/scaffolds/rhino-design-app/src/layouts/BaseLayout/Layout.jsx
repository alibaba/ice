import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from '../../components/Header';
import './Layout.scss';

export default class CustomLayout extends Component {
  render() {
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className="ice-admin-aside-layout"
      >
        <Header />

        <Layout.Section className="ice-admin-layout-body">
          <Layout.Main>{this.props.children}</Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
