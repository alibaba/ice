import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './StatisticalCard.scss';

const dataSource = [
  {
    text: '昨日内容浏览次数',
    number: '46,657',
    circle: {
      width: 36,
      height: 31,
      icon: 'https://gw.alicdn.com/tfs/TB1YDjNh4rI8KJjy0FpXXb5hVXa-36-31.png',
    },
    helpURL: 'http://taobao.com',
  },
  {
    text: '昨日账号主页浏览人数',
    number: '96',
    circle: {
      width: 40,
      height: 43,
      icon: 'https://gw.alicdn.com/tfs/TB1Vzv5h2DH8KJjy1XcXXcpdXXa-40-43.png',
    },
    helpURL: 'http://taobao.com',
  },
  {
    text: '昨日粉丝数',
    number: '157',
    circle: {
      width: 42,
      height: 29,
      icon: 'https://gw.alicdn.com/tfs/TB1uB_Fh9_I8KJjy0FoXXaFnVXa-42-29.png',
    },
    helpURL: 'http://taobao.com',
  },
  {
    text: '昨日活跃粉丝数',
    number: '42',
    circle: {
      width: 43,
      height: 42,
      icon: 'https://gw.alicdn.com/tfs/TB186kphZLJ8KJjy0FnXXcFDpXa-43-42.png',
    },
    helpURL: 'http://taobao.com',
  },
];

export default class StatisticalCard extends Component {
  static displayName = 'StatisticalCard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = () => {
    return dataSource.map((data, idx) => {
      const imgStyle = {
        width: `${data.circle.width}px`,
        height: `${data.circle.height}px`,
      };
      return (
        <div key={idx} className="statistical-card-item">
          <div className="circle-wrap">
            <img src={data.circle.icon} style={imgStyle} alt="图片" />
          </div>
          <div className="statistical-card-desc">
            <div className="statistical-card-text">
              {data.text}
              <a href={data.helpURL} target="_blank">
                <img
                  src="https://gw.alicdn.com/tfs/TB1uR_Fh9_I8KJjy0FoXXaFnVXa-12-12.png"
                  style={{
                    width: '12px',
                    height: '12px',
                  }}
                  alt="图片"
                />
              </a>
            </div>
            <div className="statistical-card-number">{data.number}</div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="statistical-card">
        <IceContainer className="statistical-card-list">{this.renderItem()}</IceContainer>
      </div>
    );
  }
}
