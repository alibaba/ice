import React, { Component } from 'react';
import MemberList from './components/MemberList';

export default class Member extends Component {
  static displayName = 'Member';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <MemberList />
      </div>
    );
  }
}
