import { Dialog, Button, Input } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import semver from 'semver';
import latestVersion from 'latest-version';

import projectScripts from '../../../lib/project-scripts';
import logger from '../../../lib/logger';
import services from '../../../services';
import dialog from '../../../components/dialog';

const { interaction, settings } = services;

@inject('projects', 'installer')
@observer
class AddPackage extends Component {
  /**
   * 添加依赖安装提示
   */
  addDepsConfirmNotice = (newDeps = [], projectDeps = {}) => {
    const { installer } = this.props;
    const newDepsArr = [];
    const projectDepsArr = [];
    newDeps.forEach((newDep) => {
      Object.keys(projectDeps).forEach((projectDep) => {
        if (newDep.name === projectDep) {
          const {
            major: newDepMajor,
            version: newDepVersion,
          } = semver.minVersion(newDep.version);
          const { major: projectDepMajor } = semver.minVersion(
            projectDeps[projectDep]
          );
          if (newDepMajor > projectDepMajor) {
            newDepsArr.push(`${newDep.name}@${newDepVersion}`);
            projectDepsArr.push(`${newDep.name}@${projectDeps[projectDep]}`);
          }
        }
      });
    });

    if (newDepsArr.length) {
      dialog.confirm(
        {
          title: '提示',
          content: (
            <div>
              新添加的依赖
              {' '}
              {newDepsArr.join(',')}
              {' '}
主版本号与项目依赖
              {projectDepsArr.join(',')}
              {' '}
主版本号发生改变可能存在不兼容的 API
              修改，确定要继续吗
            </div>
          ),
        },
        (ok) => {
          if (ok) {
            this.startNpmInstall();
          } else {
            installer.installing = false;
          }
        }
      );
    } else {
      this.startNpmInstall();
    }
  };

  /**
   * 包版本对比检查
   */
  checkPackageVersion = (deps) => {
    const {
      projects: { currentProject },
    } = this.props;
    const {
      pkgData: { dependencies: projectDeps },
    } = currentProject;

    // 新增的依赖是否有指定版本，过滤掉指定版本的依赖
    const newDeps = deps
      .split(/\s+/)
      .filter((dep) => !!dep.trim())
      .filter((dep) => !dep.startsWith('@') || dep.lastIndexOf('@') > 0);

    if (!newDeps.length) {
      return this.startNpmInstall();
    }

    // 新增的依赖是否在项目中
    const existDeps = newDeps.filter((dep) => Object.keys(projectDeps).includes(dep)
    );
    if (!existDeps.length) {
      return this.startNpmInstall();
    }

    // 获取当前项目存在依赖的最新版本，根据最新版本进行提示
    const registryUrl = settings.get('registry') || 'http://registry.npmjs.org';
    const getLatestVersion = existDeps.map((dep) => latestVersion(dep, { registryUrl }).then((v) => Promise.resolve({ name: dep, version: v })
    )
    );
    Promise.all(getLatestVersion)
      .then((result) => {
        this.addDepsConfirmNotice(result, projectDeps);
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  /**
   * 开始执行 npm 安装
   */
  startNpmInstall = () => {
    const { installer, projects } = this.props;
    const { currentProject } = projects;
    projectScripts.npminstall(
      currentProject,
      installer.deps,
      installer.type === 'devDependencies',
      (error, dependencies) => {
        installer.installing = false;
        if (error) {
          dialog.alert({
            title: '安装依赖失败',
            content: (
              <div>
                请确认
                {' '}
                {dependencies.join(' ')}
                {' '}
依赖存在，或网络连接正常，
                <br />
                可展开【运行日志】查看详细反馈信息。
              </div>
            ),
          });
        } else {
          installer.close();
          interaction.notify({
            title: '依赖安装成功',
            body: dependencies.join(' '),
            type: 'success',
          });
        }
      }
    );
  };

  /**
   * 确认安装依赖前执行包版本检查
   */
  handleNpminstallOk = () => {
    const { installer } = this.props;
    installer.installing = true;
    this.checkPackageVersion(installer.deps);
  };

  handleDevDependencies = (event) => {
    const target = event.target;
    const value = target.checked;

    if (value) {
      this.props.installer.type = 'devDependencies';
    } else {
      this.props.installer.type = 'dependencies';
    }
  };

  handleNpminstallClose = () => {
    if (!this.props.installer.installing) {
      this.props.installer.close();
    }
  };

  handleDepsChange = (value) => {
    this.props.installer.deps = value;
  };

  render() {
    return (
      <Dialog
        title="添加依赖"
        visible={this.props.installer.visible}
        onClose={this.handleNpminstallClose}
        footer={(
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {/*
              <input
                disabled={this.props.installer.installing}
                checked={this.props.installer.type === 'devDependencies'}
                type="checkbox"
                name="devDependencies"
                id="devDependencies"
                onChange={this.handleDevDependencies}
              />
              <label
                style={{
                  useSelect: 'none',
                  cursor: 'pointer',
                  textIndent: '4px',
                  fontSize: 12,
                }}
                htmlFor="devDependencies"
              >
                安装为开发依赖
              </label>
            */}
            <Button
              disabled={this.props.installer.installing}
              size="small"
              onClick={this.handleNpminstallClose}
            >
              取消
            </Button>
            <Button
              size="small"
              type="primary"
              disabled={
                this.props.installer.deps.trim() === ''
                || this.props.installer.installing
              }
              onClick={this.handleNpminstallOk}
              loading={this.props.installer.installing}
            >
              {this.props.installer.installing ? '正在安装...' : '确定'}
            </Button>
          </div>
)}
      >
        <Input
          onChange={this.handleDepsChange}
          placeholder="请输入 npm 包名以及版本号，例如：lodash@latest"
          style={{ width: 300 }}
          multiple
        />
      </Dialog>
    );
  }
}

export default AddPackage;
