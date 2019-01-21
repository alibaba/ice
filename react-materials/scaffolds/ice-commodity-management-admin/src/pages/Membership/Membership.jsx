import React, { Component } from 'react';
import Table from './components/Table';
import PageHead from '../../components/PageHead';

export default class Membership extends Component {
  render() {
    return (
      <div>
        <PageHead title="会员管理" />
        <Table />
      </div>
    );
  }
}
