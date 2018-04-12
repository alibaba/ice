import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExampleLayout extends Component {
  static displayName = 'ExampleLayout';

  static propTypes = {
    value: PropTypes.string
  };

  static defaultProps = {
    value: 'string data'
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        example-layout
      </div>
    );
  }
}

const styles = {

}
