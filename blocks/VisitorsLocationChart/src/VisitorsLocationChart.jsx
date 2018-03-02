import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import MapChart from './MapChart';

export default class VisitorsLocationChart extends Component {
  static displayName = 'VisitorsLocationChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <MapChart />
      </IceContainer>
    );
  }
}
