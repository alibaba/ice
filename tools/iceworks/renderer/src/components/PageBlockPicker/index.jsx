import { Dialog, Button, Feedback } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import fs from 'fs';
import Notification from '@icedesign/notification';
import path from 'path';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { dependenciesFormat } from '../../lib/project-utils';
import {
  Panel as BlockPickerPanel,
  Previewer as BlockPreview,
  PreviewTitle,
} from '../BlockPicker';
import dialog from '../dialog';
import services from '../../services';
import './index.scss';

const { scaffolder, npm } = services;

// 向页面新增 block 的功能
// 包括展示现有 page 下的 blocks 以及选择新 block 的管理

@inject('pageBlockPicker', 'blocks', 'projects')
@observer
class PageBlockPicker extends Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired,
    pageBlockPicker: PropTypes.object.isRequired,
  };

  /**
   * 添加区块
   */
  handleSelectedBlock = (blockObj) => {
    const { pageBlockPicker, blocks } = this.props;
    if (Array.isArray(blockObj)) {
      blockObj.forEach( block => 
        blocks.addBlock(block, pageBlockPicker.existBlocks)
      );
    } else {
      blocks.addBlock(blockObj, pageBlockPicker.existBlocks);
    }
  };

  /**
   * 关闭弹窗取消下载区块
   */
  handleClose = () => {
    const { pageBlockPicker, blocks } = this.props;
    if (!pageBlockPicker.isDownloading) {
      blocks.reset();
      pageBlockPicker.close();
    } else {
      return false;
    }
  };

  /**
   * 开始下载区块
   */
  handleOk = () => {
    
    const { pageBlockPicker } = this.props;
    const { pageName, projectPath } = pageBlockPicker;
    const { isNodeProject } = this.props.projects.currentProject;
    const blocks = toJS(this.props.blocks.selected);

    // 检测 block 是否存在冲突等
    if (pageBlockPicker.blockHasConflict(blocks)) {
      Feedback.toast.error(
        `区块名 ${pageBlockPicker.blockHasConflict()} 存在冲突，请修改后重试`
      );
      return false;
    }

    pageBlockPicker.downloadStart();
    let blocksDependencies;
    scaffolder.utils
      .downloadBlocksToPage({
        destDir: projectPath,
        blocks: blocks,
        pageName: pageName,
        isNodeProject,
      })
      .catch((err) => {
        pageBlockPicker.downloadDone();
        console.log(err);
      })
      .then(({ dependencies }) => {
        blocksDependencies = dependencies;
        // 下载包依赖完成后对 dependencies 进行安装操作
        // 如果安装失败，自动将 dependencies 与 package.json 进行合并
        const scaffoldDependencies = dependenciesFormat(dependencies);
        // 开始安装项目依赖
        console.log('安装依赖', scaffoldDependencies);
        return npm.run(
          ['install', '--no-package-lock'].concat(scaffoldDependencies),
          {
            cwd: projectPath,
          }
        );
      })
      .then(() => {
        pageBlockPicker.close();
        console.log('区块依赖安装完成');
        Notification.success({
          message: '区块下载完成，区块需要自行引入到页面中',
          duration: 8,
        });
      })
      .catch((error) => {
        dialog.notice({
          title: '区块依赖安装失败',
          error: error,
        });
        // 兜底逻辑，将依赖信息写入到 package.json 里
        const packageFile = path.join(projectPath, 'package.json');
        new Promise((resolve, reject) => {
          try {
            const pkgData = fs.readFileSync(packageFile);
            resolve(JSON.parse(pkgData.toString()));
          } catch (e) {
            console.log(e);
            reject();
          }
        }).then((pkgData) => {
          console.log(pkgData);
          if (pkgData) {
            pkgData.dependencies = Object.assign(
              pkgData.dependencies || {},
              blocksDependencies
            );
            try {
              fs.writeFileSync(packageFile, JSON.stringify(pkgData, null, 2));
              pageBlockPicker.close();
              Notification.warning({
                message:
                  '区块依赖已兜底写入 package.json，可通过【重装依赖】修复',
                duration: 8,
              });
            } catch (e) {
              pageBlockPicker.downloadDone();
              dialog.notice({
                title: '写入 package.json 失败',
                error:
                  'package.json 不存在或存在语法错误 检查 ' +
                  path.join(projectPath, 'package.json'),
              });
            }
          } else {
            return Promise.reject('不存在 package.json');
          }
        });
      });
  };

  render() {
    return (
      <Dialog
        className="fullscreen-dialog"
        visible={this.props.pageBlockPicker.visible}
        onClose={this.handleClose}
        footer={false}
        closable={!this.props.pageBlockPicker.isDownloading}
      >
        <div className="page-block-picker">
          <div className="page-block-picker-header">
            下载区块到 {this.props.pageBlockPicker.componentsPath}
          </div>
          <div className="page-block-picker-body">
            <div className="page-block-picker-panel">
              <BlockPickerPanel 
                onSelected={this.handleSelectedBlock}
              />
            </div>
            <div className="page-block-picker-preview">
              {this.props.pageBlockPicker.existBlocks.length ? (
                <PreviewTitle
                  title="已有区块"
                  count={this.props.pageBlockPicker.existBlocks.length}
                />
              ) : null}
              {this.props.pageBlockPicker.existBlocks &&
                this.props.pageBlockPicker.existBlocks.map((blockName) => {
                  return (
                    <div className="block-item" key={blockName}>
                      {blockName}
                    </div>
                  );
                })}
              <div className="page-block-picker-added">
                <BlockPreview title="新增区块" text="请从左侧选择区块" />
              </div>
            </div>
          </div>
          <div className="page-block-picker-footer">
            <Button
              disabled={this.props.blocks.selected.length == 0}
              loading={this.props.pageBlockPicker.isDownloading}
              type="primary"
              onClick={this.handleOk}
            >
              {this.props.pageBlockPicker.isDownloading
                ? '正在下载区块...'
                : '开始下载'}
            </Button>
            <Button
              disabled={this.props.pageBlockPicker.isDownloading}
              onClick={this.handleClose}
            >
              取消
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default PageBlockPicker;
