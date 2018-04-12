

import React, { Component } from 'react';

import NotPermission from './components/NotPermission';

import './Forbidden.scss';

export default class Forbidden extends Component {
  static displayName = 'Forbidden';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="forbidden-page">
        <NotPermission />
      </div>
    );
  }
}
