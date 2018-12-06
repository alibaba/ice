import React, { Component } from 'react';
import BaseInfo from './components/BaseInfo';

export default class Detail extends Component {
  static displayName = 'Detail';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="detail-page" >
        <BaseInfo />
      </div>
    );
  }
}
