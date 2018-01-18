

import React, { Component } from 'react';

import TextCard from './components/text-card';

import ApplicationProgress from './components/application-progress';

import './ProgressInfo.scss';

export default class ProgressInfo extends Component {
  static displayName = 'ProgressInfo';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="progress-info-page">

        <TextCard />

        <ApplicationProgress />

      </div>
    );
  }
}
