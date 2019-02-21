import React, { Component } from 'react';

import BasicDetailInfo from './components/BasicDetailInfo';

import CollapseCard from './components/CollapseCard';

import DetailTable from './components/DetailTable';

import './Profile.scss';

export default class Profile extends Component {
  static displayName = 'Profile';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="profile-page">
        <BasicDetailInfo />

        <CollapseCard />

        <DetailTable />
      </div>
    );
  }
}
