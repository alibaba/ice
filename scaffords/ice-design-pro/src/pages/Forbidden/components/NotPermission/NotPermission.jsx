import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './NotPermission.scss';

export default class NotPermission extends Component {
  static displayName = 'NotPermission';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="not-permission" style={styles.notPermission}>
        <IceContainer>
          <div style={styles.content}>
            <img
              src="https://img.alicdn.com/tfs/TB1Gy4Yjv6H8KJjy0FjXXaXepXa-780-780.png"
              style={styles.image}
              alt="prmission"
            />
            <div style={styles.prompt}>
              <h3 style={styles.title}>抱歉，您无权限～</h3>
              <p style={styles.description}>抱歉，您暂无权限，请看看其他页面</p>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
  },
  image: { width: '260px', height: '260px', marginRight: '50px' },
  title: { color: '#333', fontSize: '24px', margin: '20px 0' },
  description: { color: '#666' },
  notPermission: {},
};
