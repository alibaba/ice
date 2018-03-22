import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';
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
        poster:
          'https://img.alicdn.com/tfs/TB15B7LfeuSBuNjy1XcXXcYjFXa-596-356.png',
        title: '这里是示例视频1的视频标题',
        duration: '10:54',
        sources: [
          {
            src:
              '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50033572083.mp4',
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
    height: 500,
  },
  videoWrapperMobile: {
    height: 300,
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 300,
  },
  videoMobile: {
    height: 300,
  },
};

const mockVideoData = [
  {
    poster:
      'https://img.alicdn.com/tfs/TB15B7LfeuSBuNjy1XcXXcYjFXa-596-356.png',
    title: '这里是示例视频1的视频标题',
    duration: '10:54',
    sources: [
      {
        src:
          '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50033572083.mp4',
        type: 'video/mp4',
      },
    ],
  },
  {
    poster:
      'https://img.alicdn.com/tfs/TB1Z8MnfmCWBuNjy0FhXXb6EVXa-593-389.png',
    title: '这里是示例视频2的视频标题',
    duration: '03:54',
    sources: [
      {
        src:
          '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50069942168.mp4',
        type: 'video/mp4',
      },
    ],
  },
  {
    poster:
      'https://img.alicdn.com/tfs/TB15B7LfeuSBuNjy1XcXXcYjFXa-596-356.png',
    title: '这里是示例视频3的视频标题',
    duration: '10:54',
    sources: [
      {
        src:
          '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50033572083.mp4',
        type: 'video/mp4',
      },
    ],
  },
  {
    poster:
      'https://img.alicdn.com/tfs/TB1Z8MnfmCWBuNjy0FhXXb6EVXa-593-389.png',
    title: '这里是示例视频4的视频标题',
    duration: '03:54',
    sources: [
      {
        src:
          '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50069942168.mp4',
        type: 'video/mp4',
      },
    ],
  },
];
