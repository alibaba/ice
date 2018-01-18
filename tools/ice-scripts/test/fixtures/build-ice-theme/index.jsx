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
      <div>
        <Button type="primary">ICE Button <Icon type="good" /></Button>
        <p>自定义 ICON</p>
        <p><Icon type="favorites" /></p>
        <p><Icon type="nav-more" /></p>
        <p><Icon type="auto" /></p>
        <p><Icon type="lights" /></p>
        <p><Icon type="gifts" /></p>
        <p><Icon type="electronics" /></p>
        <p><Icon type="bags" /></p>
        <p><Icon type="process" /></p>
        <p><Icon type="error-filling" /></p>
        <p><Icon type="back" /></p>
      </div>
    );
  }
}

render(<App />, mountNode);