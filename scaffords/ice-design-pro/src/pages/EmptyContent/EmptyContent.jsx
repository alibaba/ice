'use strict';

import React, { Component } from 'react';

import EmptyContent from './components/EmptyContent';

import './EmptyContent.scss';

export default class EmptyContent2 extends Component {
  static displayName = 'EmptyContent2';

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
