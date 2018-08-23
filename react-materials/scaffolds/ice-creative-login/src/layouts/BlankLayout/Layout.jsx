import React, { Component } from 'react';
import Layout from '@icedesign/layout';

export default class BlankLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return <Layout style={styles.container}>{this.props.children}</Layout>;
  }
}

const styles = {
  container: {
    minHeight: '100vh',
  },
};
