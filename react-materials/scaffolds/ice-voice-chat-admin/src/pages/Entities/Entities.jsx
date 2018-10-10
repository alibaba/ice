import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import EntitlesTable from './components/EntitlesTable';

export default class Entities extends Component {
  static displayName = 'Entities';

  render() {
    return (
      <div>
        <TopBar title="实体管理（Entities）" buttonText="新建实体" />
        <EntitlesTable />
      </div>
    );
  }
}
