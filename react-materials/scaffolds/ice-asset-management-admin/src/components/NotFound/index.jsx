import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IceContainer from '@icedesign/container';

export default class NotFound extends Component {
  render() {
    return (
      <IceContainer>
        <div style={styles.notfoundContent}>
          <img
            src={require('./images/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png')}
            style={styles.imgNotfound}
            alt="页面不存在"
          />
          <div className="prompt">
            <h3 style={styles.title}>抱歉，你访问的页面不存在</h3>
            <p style={styles.description}>
              您要找的页面没有找到，请返回<Link to="/">首页</Link>继续浏览
            </p>
          </div>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  notfoundContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
  },
  imgNotfound: {
    marginRight: '50px',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    margin: '20px 0',
  },
  description: {
    color: '#666',
    fontSize: '16px',
  },
};
