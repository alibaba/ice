import React, { Component } from 'react';
import LibTable from './components/LibTable';

export default class LibManagement extends Component {
  static displayName = 'LibManagement';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <LibTable />
      </div>
    );
  }
}
