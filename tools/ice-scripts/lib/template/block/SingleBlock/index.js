import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

export default class CustomComponent extends Component {
  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'string data',
  };

  render() {
    return (
      <div className={styles.block}>
        {this.props.value}
      </div>
    );
  }
}
