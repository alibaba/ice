import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './EmptyContent.scss';

export default class EmptyContent extends Component {
  static displayName = 'EmptyContent';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="empty-content">
        <IceContainer>
          <div style={styles.content}>
            <img
              src="https://img.alicdn.com/tfs/TB1WNNxjBHH8KJjy0FbXXcqlpXa-780-780.png"
              style={styles.image}
              alt="empty"
            />
            <div style={styles.prompt}>
              <h3 style={styles.title}>页面暂无内容</h3>
              <p style={styles.description}>
                抱歉，页面暂无内容，请看看其他页面
              </p>
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
};
