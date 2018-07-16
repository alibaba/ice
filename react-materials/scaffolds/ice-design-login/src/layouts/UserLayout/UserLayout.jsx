import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Footer from './components/Footer';

import './UserLayout.scss';

export default class UserLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout className="user-layout" style={styles.container}>
        <div className="header">
          <a href="#" className="meta">
            <img
              className="logo"
              src={require('./images/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png')}
              alt="logo"
            />
            <span className="title">飞冰</span>
          </a>
          <p className="desc">飞冰让前端开发简单而友好</p>
        </div>
        {this.props.children}
        <Footer />
      </Layout>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    paddingTop: '100px',
    background: '#f0f2f5',
    backgroundImage:
      `url(${require('./images/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png')})`,
    backgroundSize: 'contain',
  },
};
