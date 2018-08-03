import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default class EmojiMart extends Component {
  static displayName = 'EmojiMart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <Picker set="emojione" style={{ width: '100%' }} />
      </IceContainer>
    );
  }
}
