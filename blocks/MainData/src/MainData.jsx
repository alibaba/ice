import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import './MainData.scss';

export default class MainData extends Component {
  static displayName = 'MainData';

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
      <div className="main-data">
        <IceContainer>
          hello main-data
        </IceContainer>
      </div>
    );
  }
}

const styles = {

}
