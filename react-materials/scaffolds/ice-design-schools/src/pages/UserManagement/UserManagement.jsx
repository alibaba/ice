import React, { Component } from 'react';
import UserSearch from './components/UserSearch';
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
        <UserSearch />
        <UserTable />
      </div>
    );
  }
}
