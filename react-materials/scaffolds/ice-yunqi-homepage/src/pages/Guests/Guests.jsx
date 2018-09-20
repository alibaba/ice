import React, { Component } from 'react';
import GuestSlider from './components/GuestSlider';
import GuestList from './components/GuestList';

export default class Guests extends Component {
  static displayName = 'Guests';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <GuestSlider />
        <GuestList />
      </div>
    );
  }
}
