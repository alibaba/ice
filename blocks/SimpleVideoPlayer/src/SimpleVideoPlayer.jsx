import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import './SimpleVideoPlayer.scss';

export default class SimpleVideoPlayer extends Component {
  static displayName = 'SimpleVideoPlayer';

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
      <div className="simple-video-player">
        <IceContainer>
          hello simple-video-player
        </IceContainer>
      </div>
    );
  }
}

const styles = {

}
