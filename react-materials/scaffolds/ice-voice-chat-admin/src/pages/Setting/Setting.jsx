import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import InfoForm from './components/InfoForm';

export default class Setting extends Component {
  static displayName = 'Setting';

  render() {
    return (
      <div>
        <TopBar title="基本设置" />
        <InfoForm />
      </div>
    );
  }
}
