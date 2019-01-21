import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from '@icedesign/base';
import { inject, observer } from 'mobx-react';

/**
 * 进度条
 */
@inject('progress')
@observer
export default class ProgressWrap extends Component {

  render() {
    const {
      isInProgress,
      statusText,
      progress,
      progressSpeed,
      progressRemaining
    } = this.props.progress;

    if (!isInProgress) {
      return null;
    }

    return (
      <div>
        <div>
          <span style={{ fontSize: 12, color: '#999' }}>
            {statusText}
          </span>
        </div>
        <div>
          <Progress
            style={{ width: '40%' }}
            showInfo={false}
            percent={progress}
            animation={false}
          />
          <span style={{ fontSize: 12, color: '#999', paddingLeft: 10 }}>
            {progress}%
          </span>
          <span style={{ fontSize: 12, color: '#999', paddingLeft: 10 }}>
            {progressSpeed}
            /kbs
          </span>
          <span style={{ fontSize: 12, color: '#999', paddingLeft: 10 }}>
            剩余 {progressRemaining} s
          </span>
        </div>
      </div>
    );
  }
}