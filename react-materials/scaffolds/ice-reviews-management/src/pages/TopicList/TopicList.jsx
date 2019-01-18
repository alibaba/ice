import React, { Component } from 'react';
import Overview from './components/Overview';
import TabTable from './components/TabTable';

export default class TopicList extends Component {
  render() {
    return (
      <div>
        <Overview />
        <TabTable />
      </div>
    );
  }
}
