import React, { Component } from 'react';
import CustomTable from './CustomTable';
import Filter from './Filter';

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Filter />
        <CustomTable />
      </div>
    );
  }
}
