

import React, { Component } from 'react';

import EmptyContent from './components/EmptyContent';

import './Empty.scss';

export default class Empty extends Component {
  static displayName = 'Empty';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="empty-content-page">
        <EmptyContent />
      </div>
    );
  }
}
