'use strict';

import React, { Component } from 'react';

import TextSearchList from './components/text-search-list';

import './List.scss';

export default class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="list-page">
        
        <TextSearchList />
        
      </div>
    );
  }
}
