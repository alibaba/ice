import { Dialog } from '@icedesign/base';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import projectScripts from '../../../lib/project-scripts';
import services from '../../../services';

const { interaction } = services;

/**
 * 用于在新项目创建完成后，操作初始化依赖的功能
 */
@observer
class ProjectInit extends Component {
  handleCancel = () => {
    this.props.project.setNeedInstallDeps(false);
  };
  handleOk = () => {
    const { project } = this.props;
    const nodeFramework = project.nodeFramework;
    project.setNeedInstallDeps(false);
    project.toggleTerminal();

    project.installStart();
    projectScripts.install(
      { project, reinstall: false },
      (code, alertContent) => {
        project.installDone();
        if (code !== 0) {
          alert(alertContent);
        } else {
          interaction.notify({
            title: '项目依赖安装完成',
            type: 'success',
            body: '后续可通过自定义安装依赖添加',
          });
        }
      }
    );
  };
  render() {
    const { project } = this.props;
    if (project && !project.isUnavailable) {
      return (
        <Dialog
          visible={project.needInstallDeps}
          title="初始化项目"
          onClose={this.handleCancel}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <div style={{ width: 400, lineHeight: '24px' }}>
            当前项目依赖尚未安装，安装过程可能需要几分钟，是否立即安装？
          </div>
        </Dialog>
      );
    }
    return null;
  }
}

export default ProjectInit;
