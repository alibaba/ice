import React, { Component } from 'react';
import Banner from './components/Banner';
import Introduction from './components/Introduction';
import Feature from './components/Feature';
import Data from './components/Data';
import Solution from './components/Solution';
import Resource from './components/Resource';

export default class HomePage extends Component {
  static displayName = 'HomePage';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Banner />
        <Introduction />
        <Feature />
        <Data />
        <Solution />
        <Resource />
      </div>
    );
  }
}
