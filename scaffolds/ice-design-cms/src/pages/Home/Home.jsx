

import React, { Component } from 'react';

import './Home.scss';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page" />
    );
  }
}
