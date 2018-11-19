import { Button } from '@icedesign/base';
import { observer, inject } from 'mobx-react';
import React, { Component } from 'react';

import history from '../../../history';
import Icon from '../../../components/Icon';
import Option from './Option';

import './index.scss';

@inject('switcher', 'projects')
@observer
class ProjectSwitch extends Component {
  static displayName = 'ProjectSwitch';

  handleClickMask = () => {
    this.props.switcher.close();
  };

  handleSwitchProject = (newProject) => {
    this.props.switcher.close();
    this.props.projects.setCurrentProject(newProject.fullPath);
  };

  // 删除列表中的项目
  handleRemove = (projectFullPath, shiftDelete) => {
    this.props.projects.remove(projectFullPath, shiftDelete);
    if (this.props.projects.isEmpty) {
      // 删除项目完成后，如果列表为空则关闭面板
      this.props.switcher.close();
    }
  };

  /** 打开项目，并将其设置为工作项目 */
  openExistProjectAndFocus = () => {
    this.props.projects.addFromFinder(() => {
      this.props.switcher.close();
    });
  };

  gotoCreateProject = () => {
    this.props.switcher.close();
    history.push('/scaffolds');
  };

  renderProjectList = () => {
    const { projects } = this.props;
    const list = projects.list;
    const currentProject = projects.currentProject;

    if (!currentProject || !list || list.length == 0) {
      return (
        <div style={{ textAlign: 'center', lineHeight: '100px' }}>暂无项目</div>
      );
    }
    return (
      <ul>
        {list.map((project, index) => {
          const isActive = project.fullPath == currentProject.fullPath;
          return (
            <Option
              isActive={isActive}
              onClick={this.handleSwitchProject}
              key={project.fullPath}
              project={project}
              onRemove={this.handleRemove}
            />
          );
        })}
      </ul>
    );
  };

  render() {
    return (
      <div
        className="project-switch"
        style={{
          display: this.props.switcher.visible ? 'block' : 'none',
        }}
        onClick={this.handleClickMask}
      >
        <div
          className="project-list"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="project-list-body">{this.renderProjectList()}</div>
          <div className="project-operation-wrapper">
            <Button type="primary" onClick={this.openExistProjectAndFocus}>
              <Icon type="folderplus" /> 打开项目
            </Button>
            <Button type="primary" onClick={this.gotoCreateProject}>
              <Icon type="plus" /> 创建项目
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectSwitch;
