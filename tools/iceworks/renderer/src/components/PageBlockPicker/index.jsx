import { Dialog, Button, Feedback, Balloon } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Notification from '@icedesign/notification';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  dependenciesFormat,
  mergeDependenciesToPkg,
} from '../../lib/project-utils';
import projectScripts from '../../lib/project-scripts';
import {
  Panel as BlockPickerPanel,
  Previewer as BlockPreview,
  PreviewTitle,
} from '../BlockPicker';
import Progress from '../Progress';
import dialog from '../dialog';
import services from '../../services';
import './index.scss';

const { scaffolder, log } = services;

// 向页面新增 block 的功能
// 包括展示现有 page 下的 blocks 以及选择新 block 的管理

@inject('pageBlockPicker', 'blocks', 'projects', 'progress')
@observer
class PageBlockPicker extends Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired,
    pageBlockPicker: PropTypes.object.isRequired,
  };

  /**
   * 添加区块，支持多个
   */
  handleBlocksAdd = (blockObj) => {
    const { pageBlockPicker, blocks } = this.props;
    if (!Array.isArray(blockObj)) {
      blockObj = [blockObj];
    }
    blockObj.forEach((block) =>
      blocks.addBlock(block, pageBlockPicker.existBlocks)
    );
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
   * 兜底逻辑，将依赖信息写入到 package.json 里
   */
  writeDependencies = (blocksDependencies, clientPath) => {
    const { pageBlockPicker, progress } = this.props;
    mergeDependenciesToPkg(blocksDependencies, clientPath)
      .then(() => {
        progress.end();
        pageBlockPicker.close();
        Notification.warning({
          message:
            '区块依赖已兜底写入 package.json，可通过【重装依赖】修复，如多次失败可在设置中切换npm源再重试',
          duration: 8,
        });
      })
      .catch((e) => {
        pageBlockPicker.downloadDone();
        progress.reset();
        dialog.notice({
          title: '依赖写入 package.json 失败',
          error: e,
        });
      });
  };

  /**
   *
   * 安装区块依赖:
   *  1. 下载 tarball 包完成后对 dependencies 进行安装操作
   *  2. 如果安装失败，自动将 dependencies 与 package.json 进行合并
   */
  installBlocksDeps = (res) => {
    const { projects, progress } = this.props;
    const { currentProject = {} } = projects;
    const { clientPath } = currentProject;
    const { dependencies } = res;
    const blocksDependencies = dependenciesFormat(dependencies);

    if (blocksDependencies.length > 0) {
      progress.setStatusText('正在下载区块依赖');
      progress.setShowTerminal(true);
      progress.setShowProgress(false);

      return new Promise((resolve, reject) => {
        projectScripts.npminstall(
          currentProject,
          blocksDependencies.join(' '),
          false,
          (error) => {
            if (error) {
              this.writeDependencies(blocksDependencies, clientPath);
              log.error('安装区块依赖失败');
              reject(new Error('安装区块依赖失败'));
            } else {
              log.info('安装区块依赖成功');
              resolve();
            }
          }
        );
      });
    }
  };

  /**
   * 开始下载区块
   */
  handleOk = () => {
    const { pageBlockPicker, projects, progress } = this.props;
    const { pageName } = pageBlockPicker;
    const { currentProject = {} } = projects;
    const { clientPath, clientSrcPath } = currentProject;
    const blocks = toJS(this.props.blocks.selected);

    // 检测 block 是否存在冲突等
    if (pageBlockPicker.blockHasConflict(blocks)) {
      Feedback.toast.error(
        `区块名 ${pageBlockPicker.blockHasConflict(
          blocks
        )} 存在冲突，请修改后重试`
      );
      return false;
    }

    pageBlockPicker.downloadStart();
    progress.start(true);
    progress.setStatusText('正在请求区块数据');
    progress.setSectionCount(blocks.length);

    scaffolder.utils
      .downloadBlocksToPage({
        clientPath,
        clientSrcPath,
        blocks,
        pageName,
        progressFunc: progress.handleProgressFunc,
      })
      .then((res = {}) => {
        const hasDeps = Object.prototype.hasOwnProperty.call(
          res,
          'dependencies'
        );
        if (!hasDeps || (hasDeps && !Object.keys(res.dependencies).length)) {
          return true;
        }
        return this.installBlocksDeps(res);
      })
      .then(() => {
        progress.end();
        pageBlockPicker.close();
        Notification.success({
          message: '区块下载完成，区块需要自行引入到页面中',
          duration: 8,
        });
      })
      .catch((error) => {
        pageBlockPicker.downloadDone();
        progress.reset();
        dialog.notice({
          title: '提示',
          error: error.stack,
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
              <BlockPickerPanel handleBlocksAdd={this.handleBlocksAdd} />
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
            <Balloon
              trigger={
                <Button
                  disabled={this.props.blocks.selected.length === 0}
                  loading={this.props.pageBlockPicker.isDownloading}
                  type="primary"
                  onClick={this.handleOk}
                >
                  {this.props.pageBlockPicker.isDownloading
                    ? '正在下载区块...'
                    : '开始下载'}
                </Button>
              }
              align="t"
              alignment="normal"
              triggerType="hover"
              style={{ width: 350, height: 85 }}
              visible={this.props.pageBlockPicker.isDownloading}
            >
              <div>
                <Progress styleOffset={[-350, 0]} />
              </div>
            </Balloon>
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
