import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class {{className}} extends Component {
  static displayName = '{{className}}';

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
        {{name}}
      </div>
    );
  }
}

const styles = {

}
