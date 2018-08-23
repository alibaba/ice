import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        <div style={styles.title}>
          技术领域智能助手 <br />
          让沟通变得更加智能、高效、便捷
        </div>
        <p style={styles.description}>Amazing Stuff is Lorem Here.ICE Team</p>
        <Link to="/" style={styles.button}>
          进入首页
        </Link>
        <div style={styles.border} />
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
    width: '88px',
  },
  title: {
    marginTop: '60px',
    fontWeight: '500',
    fontSize: '22px',
    lineHeight: '1.5',
    textAlign: 'center',
    color: '#343a40',
  },
  description: {
    marginTop: '30px',
    fontSize: '13px',
    color: '#212529',
  },
  button: {
    marginTop: '40px',
    width: '180px',
    height: '48px',
    lineHeight: '48px',
    textAlign: 'center',
    borderRadius: '50px',
    border: '1px solid #9816f4',
  },
  border: {
    position: 'absolute',
    top: '100px',
    bottom: '100px',
    right: '0',
    background: '#ffffff',
    width: '30px',
    boxShadow: '-19px 0 35px -7px #F5F5F5',
  },
};
