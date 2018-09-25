import React, { Component } from 'react';
import ModelTable from './components/ModelTable';

export default class ModelManagement extends Component {
  static displayName = 'ModelManagement';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ModelTable />
      </div>
    );
  }
}
