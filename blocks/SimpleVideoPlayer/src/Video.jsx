import React, { Component } from 'react';

export default class Video extends Component {
  static displayName = 'Video';

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const { sources, ...others } = this.props;

    if (!sources || !sources.length) {
      return null;
    }

    return (
      <video controls {...others}>
        <track kind="captions" />
        {sources.map((video, index) => {
          return <source {...video} key={index} />;
        })}
      </video>
    );
  }
}
