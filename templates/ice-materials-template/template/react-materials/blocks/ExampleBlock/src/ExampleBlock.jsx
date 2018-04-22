import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExampleBlock extends Component {
  static displayName = 'ExampleBlock';

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
        example-block
      </div>
    );
  }
}

const styles = {

}
