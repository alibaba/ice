import React, { Component } from 'react';
import Banner from './components/Banner';
import Introduction from './components/Introduction';

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
        <Banner />
        <Introduction />
      </div>
    );
  }
}
