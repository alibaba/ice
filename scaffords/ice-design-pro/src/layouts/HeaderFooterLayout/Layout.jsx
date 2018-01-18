import React, { PureComponent } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import './Layout.scss';

export default class BasicLayout extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx({
          'ice-admin-layout': true,
          'ice-admin-header-footer-layout': true,
        })}
      >
        <Header />

        <Layout.Main>{this.props.children}</Layout.Main>

        <Footer />
      </Layout>
    );
  }
}
