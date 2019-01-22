import React, { Component } from 'react';
import Table from './components/Table';
import PageHead from '../../components/PageHead';

export default class Dispatch extends Component {
  render() {
    return (
      <div>
        <PageHead title="发货管理" />
        <Table />
      </div>
    );
  }
}
