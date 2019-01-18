import React, { Component } from 'react';
import AddForm from './components/AddForm';

export default class AddTopic extends Component {
  static displayName = 'AddTopic';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <AddForm />;
  }
}
