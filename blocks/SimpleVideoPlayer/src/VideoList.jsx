import React, { Component } from 'react';
import Img from '@icedesign/img';

export default class VideoList extends Component {
  switchVideo = (video) => {
    if (this.props.onClick) {
      this.props.onClick(video);
    }
  };

  render() {
    const { list, currentVideo } = this.props;

    return (
      <div style={styles.videoList}>
        {list.length > 0
          ? list.map((item, index) => {
              const isCurrentVideo =
                JSON.stringify(item) === JSON.stringify(currentVideo);

              return (
                <div
                  key={index}
                  style={{
                    ...styles.videoItem,
                    ...(isCurrentVideo ? styles.activeVideoItem : {}),
                  }}
                  onClick={this.switchVideo.bind(this, item)}
                >
                  <div style={styles.poster}>
                    <Img
                      src={item.poster}
                      width={168}
                      height={94}
                      type="cover"
                    />
                  </div>
                  <div style={styles.content}>
                    <div style={styles.videoTitle}>{item.title}</div>
                    <div style={styles.videoDuration}>{item.duration}</div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

const styles = {
  videoList: {
    maxHeight: 500,
    overflowY: 'auto',
  },
  videoItem: {
    display: 'flex',
    marginBottom: 8,
    cursor: 'pointer',
  },
  activeVideoItem: {
    fontWeight: 'bold',
  },
  poster: {
    marginRight: 8,
  },
  videoTitle: {
    fontSize: '16px',
    lineHeight: '24px',
    marginTop: '8px',
  },
  videoDuration: {
    marginTop: '8px',
  },
};
