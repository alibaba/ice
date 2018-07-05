import React, { Component } from 'react';
import { Card } from '@icedesign/base';
import { Link } from 'react-router-dom';
import './ServerError.scss';

export default class ServerError extends Component {
  static displayName = 'ServerError';

  render() {
    return (
      <div className="server-error">
        <Card
          bodyHeight={600}
          style={{
            width: '100%',
          }}
        >
          <div className="exception-content">
            <img
              src="https://img.alicdn.com/tfs/TB1w4M7bNrI8KJjy0FpXXb5hVXa-260-260.png"
              className="img-exception"
              alt="exception"
            />
            <div className="prompt">
              <h3>抱歉，服务器出错了</h3>
              <p>
                服务器出错了，请重新刷新页面或返回<Link to="/">首页</Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
