import React, { Component } from 'react';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

export default class AuthorityTable extends Component {
  static displayName = 'AuthorityTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <TableFilter />
        <CustomTable />
      </div>
    );
  }
}

const styles = {};
