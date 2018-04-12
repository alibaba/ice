import React, { Component } from 'react';
import { Link } from 'react-router';
import IceContainer from '@icedesign/container';
import './BasicException.scss';

export default class BasicException extends Component {
  static displayName = 'BasicException';
  render() {
    return (
      <div className="basic-exception">
        <IceContainer>
          <div style={styles.exceptionContent} className="exception-content">
            <img
              src="https://img.alicdn.com/tfs/TB1w4M7bNrI8KJjy0FpXXb5hVXa-260-260.png"
              style={styles.imgException}
              className="imgException"
              alt="服务器出错"
            />
            <div>
              <h3 style={styles.title} className="title">
                抱歉，服务器出错了
              </h3>
              <p style={styles.description} className="description">
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
  },
  title: {
    color: '#333',
  },
  description: {
    color: '#666',
  },
};
