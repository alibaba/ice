

import React, { Component } from 'react';

import BasicDetailInfo from './components/basic-detail-info';

import CollapseCard from './components/collapse-card';

import DetailTable from './components/detail-table';

import './Portlets.scss';

export default class Portlets extends Component {
  static displayName = 'Portlets';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="portlets-page">

        <BasicDetailInfo />

        <CollapseCard />

        <DetailTable />

      </div>
    );
  }
}
