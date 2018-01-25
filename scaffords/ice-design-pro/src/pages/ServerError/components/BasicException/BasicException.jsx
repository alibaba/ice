import React, { Component } from 'react';
import { Link } from 'react-router';
import IceContainer from '@icedesign/container';
import './BasicException.scss';

export default class BasicException extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static displayName = 'BasicException';
  render() {
    return (
      <div className="basic-exception">
        <IceContainer>
          <div className="exception-content">
            <img
              src="https://img.alicdn.com/tfs/TB1w4M7bNrI8KJjy0FpXXb5hVXa-260-260.png"
              className="img-exception"
              alt="服务器出错"
            />
            <div className="prompt">
              <h3>抱歉，服务器出错了</h3>
              <p>
                服务器出错了，请重新刷新页面或返回<Link to="/">首页</Link>
              </p>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}
