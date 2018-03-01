import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import './UserStatChart.scss';

export default class UserStatChart extends Component {
  static displayName = 'UserStatChart';

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
      <div className="user-stat-chart">
        <IceContainer>
          hello user-stat-chart
        </IceContainer>
      </div>
    );
  }
}

const styles = {

}
