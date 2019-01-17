import React, { Component } from 'react';

export default class Profile extends Component {
  static displayName = 'Profile';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="profile-page">Profile</div>;
  }
}
