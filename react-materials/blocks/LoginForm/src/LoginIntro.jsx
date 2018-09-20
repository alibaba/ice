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
        <div style={styles.logo}>
          <a href="#" style={styles.link}>
            <img
              style={styles.logoImg}
              src={require('./images/logo.png')}
              alt="logo"
            />
          </a>
        </div>
        <div style={styles.title}>让前端开发简单友好</div>
        <p style={styles.description}>Amazing Stuff is Lorem Here.ICE Team</p>
        <a href="#" style={styles.button}>
          注册
        </a>
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
    height: '100vh',
  },
  logoLink: {
    display: 'block',
  },
  logoImg: {
    width: '102px',
  },
  title: {
    marginTop: '60px',
    fontWeight: '500',
    fontSize: '22px',
    lineHeight: '1.5',
    textAlign: 'center',
    color: '#fff',
  },
  description: {
    marginTop: '30px',
    fontSize: '13px',
    color: '#fff',
  },
  button: {
    marginTop: '40px',
    width: '180px',
    height: '48px',
    lineHeight: '48px',
    textAlign: 'center',
    borderRadius: '50px',
    color: '#fff',
    border: '1px solid #fff',
  },
};
