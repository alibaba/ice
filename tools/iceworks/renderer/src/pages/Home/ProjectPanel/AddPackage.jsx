import { Dialog, Button, Input } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import projectScripts from '../../../lib/project-scripts';
import services from '../../../services';
import dialog from '../../../components/dialog';

const { interaction } = services;

@inject('projects', 'installer')
@observer
class AddPackage extends Component {
  handleNpminstallOk = () => {
    const { installer, projects } = this.props;
    const { currentProject } = projects;
    // console.info('添加依赖:', installer.type, installer.cwd, installer.deps);
    installer.installing = true;
    projectScripts.npminstall(
      currentProject,
      installer.deps,
      installer.type == 'devDependencies',
      (error, dependencies) => {
        installer.installing = false;
        if (error) {
          dialog.alert({
            title: '安装依赖失败',
            content: (
              <div>
                请确认 {dependencies.join(' ')} 依赖存在，或网络连接正常，
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
        footer={
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
                checked={this.props.installer.type == 'devDependencies'}
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
                this.props.installer.deps.trim() == '' ||
                this.props.installer.installing
              }
              onClick={this.handleNpminstallOk}
              loading={this.props.installer.installing}
            >
              {this.props.installer.installing ? '正在安装...' : '确定'}
            </Button>
          </div>
        }
      >
        <Input
          onChange={this.handleDepsChange}
          placeholder={'请输入 npm 包名以及版本号，例如：lodash@latest'}
          style={{ width: 300 }}
          multiple
        />
      </Dialog>
    );
  }
}

export default AddPackage;
