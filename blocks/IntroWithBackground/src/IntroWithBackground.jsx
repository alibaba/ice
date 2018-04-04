import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import './IntroWithBackground.scss';

export default class IntroWithBackground extends Component {
  static displayName = 'IntroWithBackground';

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
      <div className="intro-with-background">
        <IceContainer>
          hello intro-with-background
        </IceContainer>
      </div>
    );
  }
}

const styles = {

}
