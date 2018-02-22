import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

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
    text: '昨日主页浏览人数',
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
        <div key={idx} style={styles.statisticalCardItem}>
          <div style={styles.circleWrap}>
            <img src={data.circle.icon} style={imgStyle} alt="图片" />
          </div>
          <div style={styles.statisticalCardDesc}>
            <div style={styles.statisticalCardText}>
              {data.text}
              <a href={data.helpURL} target="_blank">
                <img
                  src="https://gw.alicdn.com/tfs/TB1uR_Fh9_I8KJjy0FoXXaFnVXa-12-12.png"
                  style={styles.itemHelp}
                  alt="图片"
                />
              </a>
            </div>
            <div style={styles.statisticalCardNumber}>{data.number}</div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="statistical-card" style={styles.statisticalCard}>
        <IceContainer style={styles.statisticalCardItems}>
          {this.renderItem()}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  statisticalCardItems: {
    display: 'flex',
    flexDirection: 'row',
    height: '110px',
    justifyContent: 'center',
  },
  statisticalCardItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  circleWrap: {
    backgroundColor: '#FFECB3',
    width: '70px',
    height: '70px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    marginRight: '10px',
  },
  statisticalCardDesc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  statisticalCardText: {
    position: 'relative',
    color: '#333333',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  statisticalCardNumber: {
    color: '#333333',
    fontSize: '24px',
  },
  itemHelp: {
    width: '12px',
    height: '12px',
    position: 'absolute',
    top: '1px',
    right: '-15px',
  },
};
