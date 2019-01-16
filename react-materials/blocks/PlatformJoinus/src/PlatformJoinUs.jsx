import React, { Component } from 'react';
import { Button } from '@alifd/next';

export default class PlatformJoinUs extends Component {
  static displayName = 'PlatformJoinUs';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          ...styles.wrapper,
          backgroundImage: `url${require('./images/TB1Iw2ZRVXXXXb4aFXXXXXXXXXX-2760-1544.png')}`,
        }}
      >
        <div style={styles.body}>
          <div style={styles.titleWrapper}>
            <h2 style={styles.title}>现在就加入我们</h2>
            <p>
              在人工智能将替代一切的未来<br />唯有内容的创作无可替代
            </p>
          </div>
          <div style={styles.buttons}>
            <Button
              style={styles.secondaryButton}
              type="normal"
              component="a"
              href="your-url"
            >
              开通
            </Button>
            <Button
              style={styles.primaryButton}
              type="primary"
              component="a"
              href="your-url"
            >
              登录
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: 740,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  body: {},
  titleWrapper: {
    textAlign: 'center',
    paddingTop: 200,
  },
  title: {
    fontSize: 32,
    color: '#333',
    letterSpacing: '1.94px',
    lineHeight: '48px',
    textAlign: 'center',
  },
  buttons: { textAlign: 'center', marginTop: '60px' },
  primaryButton: {
    height: 50,
    fontSize: 16,
    padding: '0 58px',
    lineHeight: '50px',
    color: '#fff',
  },
  secondaryButton: {
    height: 50,
    fontSize: 16,
    padding: '0 58px',
    lineHeight: '50px',
    marginRight: 20,
    backgroundColor: 'transparent',
    borderColor: '#5485f7',
    color: '#5485f7',
  },
};
