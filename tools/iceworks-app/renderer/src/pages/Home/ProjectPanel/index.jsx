import { Dialog, Feedback } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import { ipcRenderer } from 'electron';
import loadable from 'react-loadable';
import React, { Component } from 'react';

import { openInBrowser } from '../../../external';
import ActionButton from './ActionButton';
import AddPackage from './AddPackage';
import BuildStatus from './BuildStatus';
import DevStatus from './DevStatus';
import dialog from '../../../components/dialog';
import ExtraButton from '../../../components/ExtraButton';
import Icon from '../../../components/Icon';
import ProjectInit from '../ProjectInit';
import projectScripts from '../../../lib/project-scripts';
import ProjectTerminal from '../../../components/ProjectTerminal';
import ServerUrl from './ServerUrl';
import services from '../../../services';
import StartPanel from '../../../components/StartPanel';

const ProjectDashboard = loadable({
  loader: () => import('../ProjectDashboard'),
  loading: () => (
    <div className="iceworks-skeleton-extensions">
      <div className="iceworks-skeleton-extension">
        <div className="iceworks-skeleton-extension-panel" />
      </div>
      <div className="iceworks-skeleton-extension">
        <div className="iceworks-skeleton-extension-panel" />
      </div>
      <div className="iceworks-skeleton-extension">
        <div className="iceworks-skeleton-extension-panel" />
      </div>
      <div className="iceworks-skeleton-extension">
        <div className="iceworks-skeleton-extension-panel" />
      </div>
    </div>
  ),
});

const { editors, shells, folder, interaction, createTouchBar } = services;

import './index.scss';

@inject('projects', 'newpage', 'switcher', 'installer')
@observer
class Project extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setTitle();
    this.setTouchBar();
  }

  componentDidUpdate() {
    this.setTitle();
    this.setTouchBar();
  }

  componentWillUnmount() {
    this.clearTouchBar();
  }

  clearTouchBar() {
    createTouchBar({}); // Create empty bar
  }

  setTouchBar() {
    const { currentProject } = this.props.projects;
    if (!currentProject) {
      return this.clearTouchBar();
    }

    const touchBarHandlers = {
      openEditor: this.handleOpenEditor,
      openTerminal: this.handleOpenTerminal,
      openFolder: this.handleOpenFolder,
    };

    if (!currentProject.isUnavailable) {
      touchBarHandlers.createPage = this.handleCreatePage;
      touchBarHandlers.buildProject = this.handleBuildProject;

      if (currentProject.isWorking) {
        touchBarHandlers.stopProject = this.handleStopProject;
      } else {
        touchBarHandlers.startProject = this.handleStartProject;
      }
    }

    createTouchBar(touchBarHandlers);
  }

  setTitle = () => {
    const { projects } = this.props;
    if (projects.currentProject) {
      ipcRenderer.send('setTitle', projects.currentProject.fullPath);
    } else {
      ipcRenderer.send('setTitle', 'iceworks');
    }
  };

  handleStartProject = () => {
    const { projects } = this.props;
    projectScripts.start(projects.currentProject);
  };

  handleStopProject = () => {
    const { projects } = this.props;
    projectScripts.stop(projects.currentProject);
  };

  handleBuildProject = () => {
    const { projects } = this.props;
    projectScripts.build(projects.currentProject);
  };

  // 打开新建页面流程
  handleCreatePage = () => {
    const { projects } = this.props;
    this.props.newpage.toggle();
  };

  // 编辑中打开
  handleOpenEditor = () => {
    const { projects } = this.props;
    editors.open(projects.currentProject.fullPath);
  };

  // 终端中打开
  handleOpenTerminal = () => {
    const { projects } = this.props;
    shells.open(projects.currentProject.fullPath);
  };

  // 文件夹打开
  handleOpenFolder = () => {
    const { projects } = this.props;
    folder.open(projects.currentProject.fullPath);
  };

  handleToggleProjectSwitch = () => {
    this.props.switcher.toggle();
  };

  handleNpminstallOpen = () => {
    this.props.installer.open();
  };

  handleInstallProject = () => {
    const { projects } = this.props;
    const currentProject = projects.currentProject;
    const nodeFramework = projects.currentProject.nodeFramework;
    Dialog.confirm({
      needWrapper: false,
      title: '安装项目依赖',
      content: (
        <div style={{ lineHeight: '24px', width: 300 }}>
          将重置安装项目所有依赖，安装期间无法进启动调试服务、新建页面、构建项目操作，请耐心等待。
        </div>
      ),
      onOk: () => {
        // 安装项目依赖
        currentProject.installStart();
        if (!currentProject.terminalVisible) {
          currentProject.toggleTerminal();
        }
        projectScripts.install(
          { project: currentProject },
          (code, result = {}) => {
            currentProject.installDone();
            if (code !== 0) {
              const { title, content } = result;
              dialog.alert({ title, content });
            } else {
              interaction.notify({
                title: '项目依赖安装完成',
                type: 'success',
                body: '后续可通过自定义安装依赖添加',
              });
            }
          }
        );
      },
    });
  };

  handleReloadProject = () => {
    const { projects } = this.props;
    const currentProject = projects.currentProject;
    if (currentProject) {
      currentProject.updatePkgData();
      Feedback.toast.success('刷新结束');
    }
  };

  // 修复项目脚本
  handleRepairProject = () => {
    openInBrowser(
      'https://github.com/alibaba/ice/wiki/%E5%B7%B2%E6%9C%89%E9%A1%B9%E7%9B%AE%E6%8E%A5%E5%85%A5-Iceworks'
    );
  };

  handleToggleTerminal = () => {
    const { projects } = this.props;
    const { currentProject } = projects;
    currentProject.toggleTerminal();
  };

  closeLogs = () => {
    this.handleToggleTerminal();
  }

  render() {
    const currentProject = this.props.projects.currentProject;
    if (!currentProject) {
      return (
        <div className="project-is-null">
          <StartPanel />
        </div>
      );
    }
    return (
      <div className="project-panel">
        <button
          className="project-title-wrapper"
          onClick={this.handleToggleProjectSwitch}
        >
          <h1 className="title" title={currentProject.projectName}>
            {currentProject.projectName}
          </h1>
          <span className="switch-btn">
            <Icon size="xs" type="down-triangle" />
          </span>
        </button>
        <div className="project-header">
          <div className="scripts">
            {currentProject.isWorking ? (
              <ActionButton
                disabled={currentProject.isUnavailable}
                name="stop"
                onClick={this.handleStopProject}
                label="停止调试服务"
              />
            ) : (
              <ActionButton
                disabled={currentProject.isUnavailable}
                name="start"
                onClick={this.handleStartProject}
                label="启动调试服务"
                disabledLabel="未适配"
              />
            )}
            <ActionButton
              disabled={currentProject.isUnavailable}
              name="new-page"
              onClick={this.handleCreatePage}
              label="新建页面"
              disabledLabel="未适配"
            />
            <ActionButton
              disabled={currentProject.isUnavailable}
              name="build"
              onClick={this.handleBuildProject}
              label="构建项目"
              disabledLabel="未适配"
            />
          </div>
          <div className="external">
            <ExtraButton
              placement={'bottom'}
              tipText={'在编辑器中打开'}
              onClick={this.handleOpenEditor}
            >
              <Icon size="small" type="code" /> 编辑器
            </ExtraButton>
            <ExtraButton
              placement={'bottom'}
              tipText={'在终端中打开'}
              onClick={this.handleOpenTerminal}
            >
              <Icon size="small" type="terminal" /> 终端
            </ExtraButton>
            <ExtraButton
              tipText={'在文件夹中打开'}
              onClick={this.handleOpenFolder}
            >
              <Icon size="small" type="folderopen" /> 文件夹
            </ExtraButton>
          </div>
        </div>
        <div className="project-overview">
          <div className="version">
            项目版本号：
            {(currentProject.pkgData && currentProject.pkgData.version) ||
              '-.-.-'}
          </div>
          <div className="server">
            <ServerUrl url={currentProject.serverUrl} />
          </div>
          <div className="status">
            <DevStatus
              status={currentProject.statusDev}
              progress={currentProject.statusCompileProgress}
            />
            <BuildStatus status={currentProject.statusBuild} />
            {currentProject.isDependenciesInstalling && (
              <span className={'project-status project-status-working'}>
                依赖安装中
              </span>
            )}
          </div>
          <div className="extra-action">
            {currentProject.isUnavailable && (
              <ExtraButton
                placement={'bottom'}
                tipText={
                  '适配 Iceworks 需要遵循一定的目录规范，以及信息描述，点击查看详细适配说明，适配完成后可刷新项目'
                }
                onClick={this.handleRepairProject}
              >
                <Icon size="small" type="wrencha" /> 查看适配教程
              </ExtraButton>
            )}
            {currentProject.isUnavailable && (
              <ExtraButton
                placement={'bottom'}
                tipText={'更新项目状态'}
                onClick={this.handleReloadProject}
              >
                <Icon size="small" type="reload" /> 刷新项目
              </ExtraButton>
            )}
            <ExtraButton
              disabled={!currentProject.exists}
              active={currentProject.terminalVisible}
              placement={'bottom'}
              tipText={'切换终端日志面板，查看项目运行，构建等日志'}
              onClick={this.handleToggleTerminal}
            >
              <Icon size="small" type="history" /> 运行日志
            </ExtraButton>
            <ExtraButton
              placement={'bottom'}
              disabled={currentProject.actionDisabled}
              tipText={'初始化项目依赖，或重新安装所有依赖'}
              onClick={this.handleInstallProject}
            >
              <Icon size="small" type="package_org" /> 重装依赖
            </ExtraButton>
            <ExtraButton
              disabled={currentProject.actionDisabled}
              tipText={'根据项目需要，自定义安装依赖'}
              onClick={this.handleNpminstallOpen}
            >
              <Icon size="small" type="package" /> 添加依赖
            </ExtraButton>
          </div>
        </div>
        <ProjectDashboard className="project-dashboard" />
        {currentProject.exists && currentProject.terminalVisible && (
          <ProjectTerminal
            project={currentProject}
            visible={currentProject.terminalVisible}
            closeLogs={this.closeLogs}
          />
        )}
        <AddPackage />
        <ProjectInit project={currentProject} />
      </div>
    );
  }
}

export default Project;
