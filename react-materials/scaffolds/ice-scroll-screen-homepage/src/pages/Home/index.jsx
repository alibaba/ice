import React, { Component } from 'react';
import ScrollScreen from './components/ScrollScreen';
import Header from './components/Header';

export default class Home extends Component {
  static displayName = 'Home';

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
        <ScrollScreen />
      </div>
    );
  }
}
