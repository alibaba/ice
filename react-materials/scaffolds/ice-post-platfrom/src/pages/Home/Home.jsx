import React, { Component } from 'react';
import UserLanding from './components/UserLanding';
import DataOverview from './components/DataOverview/DataOverview';
import NoticeList from './components/NoticeList/NoticeList';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <UserLanding />
        <DataOverview />
        <NoticeList />
      </div>
    );
  }
}
