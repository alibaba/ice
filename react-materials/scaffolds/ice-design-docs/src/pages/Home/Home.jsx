import React, { Component } from 'react';
import MarkdownDocs from './components/MarkdownDocs';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <MarkdownDocs />
      </div>
    );
  }
}
