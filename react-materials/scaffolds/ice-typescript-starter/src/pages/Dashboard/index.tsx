import React, { Component } from 'react';
import Guide from '../../components/Guide';
import Greeting from '../../components/Greeting';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Greeting name="TypeScript" />
        <Guide />
      </div>
    );
  }
}
