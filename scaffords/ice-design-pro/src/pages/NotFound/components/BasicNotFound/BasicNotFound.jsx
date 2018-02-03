import React, { Component } from 'react';
import { Link } from 'react-router';
import IceContainer from '@icedesign/container';
import './BasicNotFound.scss';

export default class BasicNotFound extends Component {
  static displayName = 'BasicNotFound';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="basic-not-found">
        <IceContainer>
          <div className="not-found-content">
            <img
              src="https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png"
              className="img-notfound"
              alt="页面不存在"
            />
            <div className="prompt">
              <h3>抱歉，你访问的页面不存在</h3>
              <p>
                您要找的页面没有找到，请返回<Link to="/">首页</Link>继续浏览
              </p>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}
