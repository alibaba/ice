import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default class Logo extends Component {
  render() {
    return (
      <div className={styles.container} style={this.props.style}>
        <Link to="/" className={styles.logoText}>
          {this.props.text || 'LOGO'}
        </Link>
      </div>
    );
  }
}
