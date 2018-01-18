import React, { Component } from 'react';
import NotPermission from './components/NotPermission';
import './Forbidden.scss';

export default class ForbiddenPage extends Component {
  static displayName = 'ForbiddenPage';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="forbidden-page">
        <NotPermission />
      </div>
    );
  }
}
