import React, { Component } from 'react';
import EmptyContent from './components/EmptyContent';
import './EmptyContentPage.scss';

export default class EmptyContentPage extends Component {
  static displayName = 'EmptyContentPage';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="empty-content-page-page">

        <EmptyContent />

      </div>
    );
  }
}
