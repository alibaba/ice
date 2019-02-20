import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress, Overlay } from '@icedesign/base';
import { inject, observer } from 'mobx-react';

import ExtraButton from '../ExtraButton';
import ProjectTerminal from '../ProjectTerminal';
import Icon from '../Icon';
const Popup = Overlay.Popup;

/**
 * 进度条
 */
@inject('progress', 'projects')
@observer
export default class ProgressWrap extends Component {

  render() {
    const { projects, styleOffset } = this.props;
    const { currentProject } = projects;
    const {
      visible,
      showProgress,
      showTerminal,
      statusText,
      progress,
      progressSpeed,
      progressRemaining
    } = this.props.progress;

    if (!visible) {
      return null;
    }

    return (
      <div style={{
        height: '24px',
        margin: '10px 0'
      }}>
        <div>
          <span style={{ 
            fontSize: '12px', 
            color: '#2eca9c',
            lineHeight: '24px'
          }}>
            {statusText}...
          </span>
          {
            showTerminal && (
              <Popup
                trigger={
                  <ExtraButton
                    placement={'bottom'}
                    tipText={'查看依赖安装日志，点击切换'}
                    style={{
                      float: 'right',
                      fontSize: '12px'
                    }}
                  >
                    <Icon size="small" type="history" /> 运行日志
                  </ExtraButton>
                }
                triggerType="click"
                animation={false}
                align="bl tl"
                offset={styleOffset || [-370,0]}
              >
                <div style={{
                  border: '1px solid #999',
                  padding: '10px',
                  width: '600px',
                  height: '300px',
                  background: '#fff',
                }}>
                  <ProjectTerminal
                    project={currentProject}
                    visible={true}
                    shwoClose={false}
                    id='terminal2'
                    style={{
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      padding: 0
                    }}
                  />
                </div>
              </Popup>
            )
          }
        </div>
        {
          showProgress && (
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
          )
        }
      </div>
    );
  }
}