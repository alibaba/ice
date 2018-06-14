/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Field extends Component {
  static displayName = 'Field';

  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { label, value } = this.props;
    return (
      <div style={styles.field}>
        <span style={styles.label}>{label}</span>
        <span style={styles.value}>{value}</span>
      </div>
    );
  }
}

const styles = {
  field: {
    lineHeight: '22px',
    paddingTop: '10px',
    marginTop: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    borderTop: '1px solid #e8e8e8',
    color: 'rgba(0,0,0,.65)',
  },
  value: {
    marginLeft: '8px',
    color: 'rgba(0,0,0,.85)',
  },
};
