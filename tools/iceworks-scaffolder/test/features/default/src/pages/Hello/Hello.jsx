import React, { Component } from 'react';
import AbilityIntroduction from './components/AbilityIntroduction/index';
import ApplicationProgress from './components/ApplicationProgress/index';

import './idnex.scss';

export default class Hello extends Component {
  static displayName = 'Hello';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Hello-page">
        <AbilityIntroduction />
        <ApplicationProgress />
      </div>
    );
  }
}
