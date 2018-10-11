/* eslint no-mixed-operators:0 */
import React, { PureComponent } from 'react';

class ChartTitle extends PureComponent {
  render() {
    return (
      <h5 style={{ ...styles.title, ...this.props.style }}>
        <span style={styles.dot} />
        {this.props.title}
      </h5>
    );
  }
}

const styles = {
  title: {
    position: 'relative',
    paddingLeft: '20px',
    color: '#666',
    fontWeight: 'bold',
  },
  dot: {
    position: 'absolute',
    left: '0',
    top: '6px',
    width: '12px',
    height: '12px',
    background: '#666',
    borderRadius: '100%',
  },
};

export default ChartTitle;
