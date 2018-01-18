import React, { Component, PropTypes } from 'react';
var pkg = require('./package.json');

export default class index extends Component {
  static displayName = 'index';

  static propTypes = {
    name: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <div>{JSON.stringify(pkg)}</div>;
  }
}
