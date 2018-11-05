import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import './BasicLayout.scss';

export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout className="basic-layout">
        <Header />
        <NavBar />
        <div style={{ margin: '20px' }}>{this.props.children}</div>
        <Footer />
      </Layout>
    );
  }
}
