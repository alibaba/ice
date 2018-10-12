import React, { Component } from 'react';
import BorrowForm from './components/BorrowForm';

export default class LibBorrow extends Component {
  static displayName = 'LibBorrow';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BorrowForm />
      </div>
    );
  }
}
