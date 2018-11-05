import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default class NormalLayout extends Component {
  static displayName = 'NormalLayout';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
