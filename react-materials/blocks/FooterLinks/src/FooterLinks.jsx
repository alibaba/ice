import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FooterLinks extends Component {
  static displayName = 'FooterLinks';

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
        footer-links
      </div>
    );
  }
}

const styles = {

}
