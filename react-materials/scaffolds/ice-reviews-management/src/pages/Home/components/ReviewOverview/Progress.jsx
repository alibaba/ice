import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Progress extends Component {
  static displayName = 'Progress';

  static propTypes = {
    percent: PropTypes.number,
    extra: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    percent: 100,
    extra: '',
    color: '#5485f7',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { percent, extra, color, style } = this.props;
    const customStyles = {
      width: `${percent}%`,
      backgroundColor: color,
    };

    return (
      <div style={styles.progressWrapper}>
        <span style={{ ...styles.progress, ...customStyles, ...style }} />
        {extra ? <span style={styles.extra}>{extra}</span> : null}
      </div>
    );
  }
}

const styles = {
  progressWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  progress: {
    display: 'inline-block',
    height: 5,
    marginRight: 5,
  },
};
