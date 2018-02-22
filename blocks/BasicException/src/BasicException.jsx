import React, { Component } from 'react';
import { Link } from 'react-router';
import IceContainer from '@icedesign/container';

export default class BasicException extends Component {
  static displayName = 'BasicException';
  render() {
    return (
      <div className="basic-exception">
        <IceContainer>
          <div style={styles.exceptionContent}>
            <img
              src="https://img.alicdn.com/tfs/TB1w4M7bNrI8KJjy0FpXXb5hVXa-260-260.png"
              style={styles.imgException}
              alt="服务器出错"
            />
            <div>
              <h3 style={styles.title}>抱歉，服务器出错了</h3>
              <p style={styles.description}>
                服务器出错了，请重新刷新页面或返回<Link to="/">首页</Link>
              </p>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  exceptionContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
  },
  imgException: {
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
