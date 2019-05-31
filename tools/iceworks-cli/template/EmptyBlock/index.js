import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

export default class CustomComponent extends Component {
  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'Hello ICE!',
  };

  render() {
    const { value } = this.props;
    return (
      <div className={styles.block}>
        {value}
      </div>
    );
  }
}
