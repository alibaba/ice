import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import { enquireScreen } from 'enquire-js';

import Video from './Video';
import VideoList from './VideoList';

const { Col, Row } = Grid;

export default class SimpleVideoPlayer extends Component {
  static displayName = 'SimpleVideoPlayer';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      currentVideo: {
        poster: require('./images/TB1UctgfwmTBuNjy1XbXXaMrVXa-754-420.png'),
        title: '这里是示例视频1的视频标题',
        duration: '10:54',
        sources: [
          {
            src: 'http://vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4',
          },
        ],
      },
      videoLists: mockVideoData,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  switchVideo = (selectVideo) => {
    this.setState({
      reloadVideo: true,
      currentVideo: selectVideo,
    });
    // 每次切换 video 需要将 video 标签彻底销毁重新渲染，否则不会生效
    setTimeout(() => {
      this.setState({
        reloadVideo: false,
      });
    }, 100);
  };

  render() {
    const { isMobile } = this.state;
    return (
      <div className="simple-video-player">
        <IceContainer>
          <Row gutter={20} wrap>
            <Col m="16" xxs="24">
              <div
                style={{
                  ...styles.videoWrapper,
                  ...(isMobile ? styles.videoWrapperMobile : {}),
                }}
              >
                {!this.state.reloadVideo && (
                  <Video
                    {...this.state.currentVideo}
                    style={{
                      ...styles.video,
                      ...(isMobile ? styles.videoMobile : {}),
                    }}
                  />
                )}
              </div>
            </Col>
            <Col m="8" xxs="24">
              <VideoList
                currentVideo={this.state.currentVideo}
                list={this.state.videoLists}
                onClick={this.switchVideo}
              />
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  videoWrapper: {
    width: '100%',
    background: '#000',
    height: 420,
  },
  videoWrapperMobile: {
    height: 300,
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 420,
  },
  videoMobile: {
    height: 300,
  },
};

const mockVideoData = [
  {
    poster: require('./images/TB1UctgfwmTBuNjy1XbXXaMrVXa-754-420.png'),
    title: '这里是示例视频1的视频标题',
    duration: '10:54',
    sources: [
      {
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      },
    ],
  },
  {
    poster: require('./images/TB1qEJ4fqmWBuNjy1XaXXXCbXXa-754-420.png'),
    title: '这里是示例视频2的视频标题',
    duration: '03:54',
    sources: [
      {
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      },
    ],
  },
  {
    poster: require('./images/TB1yHhWfuuSBuNjy1XcXXcYjFXa-754-420.png'),
    title: '这里是示例视频3的视频标题',
    duration: '10:54',
    sources: [
      {
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      },
    ],
  },
  {
    poster: require('./images/TB1FdDTfDtYBeNjy1XdXXXXyVXa-754-420.png'),
    title: '这里是示例视频4的视频标题',
    duration: '03:54',
    sources: [
      {
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      },
    ],
  },
];
