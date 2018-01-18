

import React, { Component } from 'react';

import DisplayCard from './components/display-card';

import InfoDisplayTab from './components/info-display-tab';

import './CardList.scss';

export default class CardList extends Component {
  static displayName = 'CardList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card-list-page">

        <DisplayCard />

        <InfoDisplayTab />

      </div>
    );
  }
}
