import React, { Component } from 'react';
import InfoDisplayTab from './components/InfoDisplayTab';
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
        <InfoDisplayTab />
      </div>
    );
  }
}
