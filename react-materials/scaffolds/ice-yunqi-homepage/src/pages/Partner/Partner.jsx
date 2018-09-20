import React, { Component } from 'react';
import Partner from './components/Partner';

export default class PartnerPage extends Component {
  static displayName = 'PartnerPage';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Partner />
      </div>
    );
  }
}
