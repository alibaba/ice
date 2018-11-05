import React, { Component } from 'react';
import DocsList from './components/DocsList';

export default class Document extends Component {
  static displayName = 'Document';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <DocsList />
      </div>
    );
  }
}
