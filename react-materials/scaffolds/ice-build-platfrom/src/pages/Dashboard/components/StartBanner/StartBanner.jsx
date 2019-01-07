import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class StartBanner extends Component {
  static displayName = 'StartBanner';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <a
          href="#"
          style={{ ...styles.link, ...styles.startLink }}
          size="large"
        >
          起步教程
        </a>
        <Link
          to="/new"
          style={{ ...styles.link, ...styles.builderLink }}
          size="large"
        >
          添加你的第一个构建器
        </Link>
      </div>
    );
  }
}

const styles = {
  container: {
    borderRadius: '4px',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151618',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1EH5cx9zqK1RjSZFjXXblCFXa-3360-520.png)',
  },
  link: {
    padding: '10px 20px',
    margin: '10px',
    color: '#333',
    borderRadius: '4px',
  },
  startLink: {
    background: 'rgba(255,255,255,0.9)',
  },
  builderLink: {
    background: 'rgba(255,255,255,0.9)',
  },
};
