import React, { Component } from 'react';
import BuilderState from './components/BuilderState';
import BuilderDynamic from './components/BuilderDynamic';
import CoBranding from './components/CoBranding';
import StartBanner from './components/StartBanner';
import BuilderTimes from './components/BuilderTimes';
import BuilderDistribution from './components/BuilderDistribution';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BuilderState />
        <BuilderDynamic />
        <BuilderTimes />
        <BuilderDistribution />
        <CoBranding />
        <StartBanner />
      </div>
    );
  }
}
