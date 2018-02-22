import React, { Component } from 'react';

export default class RightContentDisplay extends Component {
  static displayName = 'RightContentDisplay';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="right-content-display" style={styles.container}>
        <div style={styles.content}>
          <div style={styles.col}>
            <img
              src="https://img.alicdn.com/tfs/TB1MgyDjsLJ8KJjy0FnXXcFDpXa-618-1046.png"
              alt="img"
              style={styles.image}
            />
          </div>
          <div style={styles.col}>
            <h2 style={styles.title}>功能描述</h2>
            <p style={styles.description}>
              功能描述的文案，功能描述的文案功能描述的文案功能描述的文案
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '1080px',
    margin: '0 auto',
    padding: '80px 0',
  },
  content: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    overflow: 'hidden',
    height: '600px',
  },
  col: {
    width: '50%',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    lineHeight: '22px',
  },
  image: {
    position: 'absolute',
    top: '20px',
    width: '40%',
  },
};
