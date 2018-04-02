import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import './FeatureList.scss';

export default class FeatureList extends Component {
  static displayName = 'FeatureList';

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
      <div className="feature-list">
        <IceContainer>
          hello feature-list
        </IceContainer>
      </div>
    );
  }
}

const styles = {

}
