import { inject, observer } from 'mobx-react';
import filesize from 'filesize';
import fs from 'fs';
import junk from 'junk';
import path from 'path';
import pathExists from 'path-exists';
import React, { Component } from 'react';
import fecha from 'fecha';
import { Feedback } from '@icedesign/base';

import DashboardCard from '../../../components/DashboardCard/';
import EmptyTips from '../../../components/EmptyTips/';
import ExtraButton from '../../../components/ExtraButton/';
import Icon from '../../../components/Icon';
import services from '../../../services';
import projectScripts from '../../../lib/project-scripts';

const { folder } = services;

const extColorMap = {
  js: 'rgb(246, 222, 56)',
  css: 'rgb(42, 83, 224)',
  html: 'rgb(225, 77, 48)',
};

@inject('projects')
@observer
class Assets extends Component {
  static extensionName = 'assets';

  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      refreshing: false,
    };

    this.watcher = null;
  }

  componentDidMount() {
    this.recursiveAssets();
    this.props.projects.on('change', this.recursiveAssets);
  }

  componentWillUnmount() {
    this.props.projects.removeListener('change', this.recursiveAssets);
  }

  recursiveAssets = () => {
    const { projects } = this.props;
    const { currentProject } = projects;
    const cwd = currentProject.clientPath;
    let distPath = '';
    if (fs.existsSync(path.join(cwd, 'dist'))) {
      distPath = path.join(cwd, 'dist');
    } else {
      distPath = path.join(cwd, 'build');
    }
    if (pathExists.sync(distPath)) {
      const assets = this.recursiveReaddirSync(distPath, distPath);
      this.setState({
        assets,
        refreshing: false,
      });
    } else {
      this.setState({
        assets: [],
        refreshing: false,
      });
    }
  };

  handleReload = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        setTimeout(() => {
          this.recursiveAssets();
        }, 300);
      }
    );
  };

  handleFolderOpen = () => {
    const { projects } = this.props;
    const { currentProject } = projects;
    if (currentProject) {
      const cwd = currentProject.clientPath;
      const distPath = path.join(cwd, 'build');
      folder.open(distPath);
    } else {
      Feedback.toast.error('项目不存在');
    }
  };

  handleBuildProject = () => {
    const { projects } = this.props;
    projectScripts.build(projects.currentProject);
  };

  recursiveReaddirSync = (dirPath, rootDir) => {
    var stats;
    var list = [];
    var files = fs.readdirSync(dirPath).filter(junk.not);

    files.forEach((file) => {
      let fullPath = path.join(dirPath, file);
      stats = fs.lstatSync(fullPath);
      if (stats.isDirectory()) {
        list = list.concat(this.recursiveReaddirSync(fullPath, rootDir));
      } else {
        list.push({
          path: path.relative(rootDir, fullPath),
          size: filesize(stats.size),
          fullPath,
          statsSize: stats.size,
        });
      }
    });
    list = list.sort((a, b) => {
      return a.path.localeCompare(b.path);
    });
    return list;
  };

  renderAssets = () => {
    const { assets } = this.state;
    return (
      <ul>
        {assets
          .sort((prev, next) => {
            return next.statsSize - prev.statsSize;
          })
          .map((file) => {
            let ext = path.extname(file.path).substr(1);
            ext = ext.split('#')[0];
            const largeAsset = file.statsSize > 1024000;
            return (
              <li
                key={file.path}
                style={{
                  lineHeight: '20px',
                  height: 24,
                  padding: '2px 0',
                  clear: 'both',
                  overflow: 'hidden',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    paddingLeft: 6,
                    float: 'right',
                    flex: '0 0 80px',
                    textAlign: 'right',
                    color: largeAsset ? '#FA7070' : '#2ECA9C',
                  }}
                >
                  {file.size}
                </div>
                <div
                  style={{
                    padding: '0 1px',
                    backgroundColor: extColorMap[ext] || '#9c9c9c',
                    color: '#fff',
                    borderRadius: '4px',
                    width: 40,
                    textAlign: 'center',
                    fontSize: 10,
                    opacity: 0.8,
                    float: 'left',
                  }}
                >
                  {ext.toLocaleUpperCase()}
                </div>
                <div
                  style={{
                    float: 'left',
                    paddingLeft: 6,
                    width: 'calc(100% - 120px)',
                    whiteSpace: 'nowrap',
                    lineHeight: '20px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={file.path}
                >
                  {file.path}
                </div>
              </li>
            );
          })}
      </ul>
    );
  };

  renderBody = () => {
    const { assets, refreshing } = this.state;
    if (refreshing) {
      return <EmptyTips>正在检测构建结果...</EmptyTips>;
    }
    if (assets && assets.length > 0) {
      return this.renderAssets();
    }
    return <EmptyTips>暂无构建结果，请先构建项目</EmptyTips>;
  };

  getResultInfo = () => {
    const { assets, refreshing } = this.state;
    if (refreshing) {
      return null;
    }
    if (assets && assets.length > 0) {
      return {
        count: assets.length,
        time: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      };
    }
    return null;
  };

  render() {
    const info = this.getResultInfo();
    return (
      <DashboardCard>
        <DashboardCard.Header>
          <div>
            构建结果
            {info && (
              <span
                style={{
                  fontSize: 12,
                  color: '#666',
                  paddingLeft: 10,
                }}
              >
                ({info.count}
                )&nbsp;&nbsp;
                {info.time}
              </span>
            )}
          </div>
          <div>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'构建项目'}
              onClick={this.handleBuildProject}
            >
              <Icon type="build" style={{ fontSize: 18 }} />
            </ExtraButton>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'打开文件夹'}
              onClick={this.handleFolderOpen}
            >
              <Icon type="folderopen" style={{ fontSize: 18 }} />
            </ExtraButton>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'刷新'}
              onClick={this.handleReload}
            >
              <Icon type="reload" style={{ fontSize: 18 }} />
            </ExtraButton>
          </div>
        </DashboardCard.Header>
        <DashboardCard.Body>{this.renderBody()}</DashboardCard.Body>
      </DashboardCard>
    );
  }
}

const styles = {};

export default Assets;
