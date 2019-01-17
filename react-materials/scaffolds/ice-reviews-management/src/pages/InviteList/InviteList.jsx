import React, { Component } from 'react';
import Overview from './components/Overview';
import MemberList from './components/MemberList';

export default class InviteList extends Component {
  render() {
    return (
      <div>
        <Overview />
        <MemberList />
      </div>
    );
  }
}
