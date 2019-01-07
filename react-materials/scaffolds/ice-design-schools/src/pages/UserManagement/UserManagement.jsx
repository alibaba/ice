import React, { Component } from 'react';
import UserTable from './components/UserTable';

export default class UserManagement extends Component {
  static displayName = 'UserManagement';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <UserTable />
      </div>
    );
  }
}
