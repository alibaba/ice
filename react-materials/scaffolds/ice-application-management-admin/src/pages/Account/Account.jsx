import React, { Component } from 'react';
import UserForm from './components/UserForm';

export default class Account extends Component {
  static displayName = 'Account';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="account-page" >
        <UserForm />
      </div>
    );
  }
}
