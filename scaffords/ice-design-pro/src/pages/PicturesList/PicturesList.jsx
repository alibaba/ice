'use strict';

import React, { Component } from 'react';

import FilterList from './components/filter-list';

import './PicturesList.scss';

export default class PicturesList extends Component {
  static displayName = 'PicturesList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pictures-list-page">
        
        <FilterList />
        
      </div>
    );
  }
}
