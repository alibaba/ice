import React, { Component } from 'react';
import { Card } from '@icedesign/base';
import { Link } from 'react-router-dom';
import './NotFound.scss';

export default class NotFound extends Component {
  static displayName = 'NotFound';

  render() {
    return (
      <div className="not-found">
        <Card
          bodyHeight={600}
          style={{
            width: '100%',
          }}
        >
          <div className="not-found-content">
            <img
              src="https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png"
              className="img-notfound"
              alt="not found"
            />
            <div className="prompt">
              <h3>抱歉，你访问的页面不存在</h3>
              <p>
                您要找的页面没有找到，请返回<Link to="/">首页</Link>继续浏览
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
