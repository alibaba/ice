import { Dialog, Checkbox } from '@icedesign/base';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import React, { Component } from 'react';

import Icon from '../../../components/Icon';
import projectScripts from '../../../lib/project-scripts';

@observer
class Option extends Component {
  handleClick = () => {
    if (!this.props.isActive) {
      this.props.onClick(this.props.project);
    }
  };

  /**
   * 停止运行项目
   */
  handleStopProject = () => {
    if (this.props.project.isWorking) {
      this.props.project.devStop();
    }
    projectScripts.stop(this.props.project);
  };

  handleRemoveProject = () => {
    const { fullPath, projectName } = this.props.project;
    let shiftDelete = false; // 是否彻底删除
    const checkChange = (checked) => {
      // const checked = event.target.checked;
      shiftDelete = checked;
    };
    Dialog.confirm({
      title: '提示',
      needWrapper: false,
      content: (
        <div>
          <div style={{ paddingBottom: 16 }}>移除项目 "{projectName}" ?</div>
          <div className="remove-project-check">
            <Checkbox
              className="iceworks-next-checkbox"
              style={{ fontSize: '12px', color: '#999' }}
              onChange={checkChange}
              id="check_remove_project_dist"
              type="checkbox"
            >
              同时删除项目文件（可从系统垃圾箱找回）
            </Checkbox>
          </div>
        </div>
      ),
      onOk: () => {
        this.handleStopProject();
        this.props.onRemove(fullPath, shiftDelete);
      },
    });
  };

  render() {
    const classes = classnames({
      'project-item': true,
      'project-item-active': this.props.isActive,
    });
    return (
      <li className={classes}>
        <a
          title={this.props.project.fullPath}
          className="project-title"
          onClick={this.handleClick}
          href="javascript:void(0);"
        >
          {this.props.project.projectName}
        </a>
        {this.props.project.isWorking && <span className="status-working" />}
        <a className="project-delete-btn" onClick={this.handleRemoveProject}>
          <Icon size="small" type="trash" />
        </a>
      </li>
    );
  }
}

export default Option;
