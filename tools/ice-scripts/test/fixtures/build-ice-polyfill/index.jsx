import React, { Component } from 'react';
import { render } from 'react-dom';

import { Button, Icon } from '@icedesign/base';

export default class App extends Component {

  static displayName = 'App';

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div><Button type="primary">ICE Button <Icon type="good" /></Button></div>
    );
  }
}


render(<App />, mountNode);