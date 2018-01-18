

import React, { Component } from 'react';

import NotPermission from './components/not-permission';

import './NotPermission.scss';

export default class NotPermissionPage extends Component {
  static displayName = 'NotPermissionPage';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="not-permission-page">
        <NotPermission />
      </div>
    );
  }
}
