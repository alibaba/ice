import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ReviewDataChart extends Component {
  static displayName = 'ReviewDataChart';

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
        review-data-chart
      </div>
    );
  }
}

const styles = {

}
