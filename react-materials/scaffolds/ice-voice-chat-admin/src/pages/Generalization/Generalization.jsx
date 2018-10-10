import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import GeneralizationTable from './components/GeneralizationTable';

export default class Generalization extends Component {
  static displayName = 'Generalization';

  render() {
    return (
      <div>
        <TopBar title="泛化规则管理（Generalization）" buttonText="新建规则" />
        <GeneralizationTable />
      </div>
    );
  }
}
