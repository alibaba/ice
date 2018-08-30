import React, { Component } from 'react';

export default class LoginIntro extends Component {
  static displayName = 'LoginIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.title}>优质服务，追求卓越</div>
          <p style={styles.description}>Amazing Stuff is Lorem Here.ICE Team</p>
        </div>
        <div style={styles.mask} />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: '1',
    height: '100vh',
    backgroundImage: `url(${require('./images/bg.jpg')})`,
    backgroundSize: 'cover',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: '3',
  },
  mask: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: '2',
  },
  title: {
    marginTop: '60px',
    fontWeight: '500',
    fontSize: '38px',
    lineHeight: '1.5',
    textAlign: 'center',
    color: '#fff',
  },
  description: {
    marginTop: '30px',
    fontSize: '16px',
    color: '#fff',
  },
};
