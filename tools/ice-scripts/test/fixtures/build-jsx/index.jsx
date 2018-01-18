import React, {Component} from 'react';
import {render} from 'react-dom';

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
      <div>JSX compiler</div>
    );
  }
}


render(<App />, mountNode);