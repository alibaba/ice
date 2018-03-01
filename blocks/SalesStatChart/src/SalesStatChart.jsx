import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import './SalesStatChart.scss';

export default class SalesStatChart extends Component {
  static displayName = 'SalesStatChart';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="sales-stat-chart">
        <IceContainer>
          hello sales-stat-chart
        </IceContainer>
      </div>
    );
  }
}

const styles = {

}
