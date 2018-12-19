import React, { Component } from 'react';

import ServiceCard from './components/ServiceCard';
import ServiceHead from './components/ServiceHead';
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
        <ServiceHead />
        <ServiceCard />
      </div>
    );
  }
}
