import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import './BasicNotFound.scss';

export default class BasicNotFound extends Component {
  static displayName = 'BasicNotFound';

  render() {
    return (
      <div className="basic-not-found">
        <IceContainer>
          <div style={styles.exceptionContent} className="exception-content">
            <img
              src={require('./images/notFound.png')}
              style={styles.image}
              className="imgException"
              alt="页面不存在"
            />
            <div className="prompt">
              <h3 style={styles.title} className="title">
                抱歉，你访问的页面不存在
              </h3>
              <p style={styles.description} className="description">
                您要找的页面没有找到，请返回<Link to="/">首页</Link>继续浏览
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
