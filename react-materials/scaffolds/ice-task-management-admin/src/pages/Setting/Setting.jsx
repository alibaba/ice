import React, { Component } from 'react';
import BasicSetting from './components/BasicSetting';

export default class Setting extends Component {
  static displayName = 'Setting';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BasicSetting />
      </div>
    );
  }
}
