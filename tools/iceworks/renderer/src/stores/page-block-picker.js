import { observable, action, computed } from 'mobx';
import path from 'path';

import { readdirSync } from '../lib/file-system';

// store
import progress from './progress';

class PageBlockPicker {
  @observable
  visible = false;
  projectPath = '';
  componentsPath = '';
  blocksPath = '';
  existBlocks = [];
  @observable
  downloading = false;

  @computed
  get isDownloading() {
    return this.downloading == true;
  }

  @action
  blockHasConflict(selectedBlocks) {
    const blocksNames = this.existBlocks.map((n) => n.toLowerCase()); // 已经存在的 block 名称
    let confilict = '';
    for (const block of selectedBlocks) {
      if (blocksNames.includes(block.alias.toLowerCase())) {
        confilict = block.alias;
        break;
      }
    }
    return confilict;
  }

  @action
  downloadStart() {
    this.downloading = true;
  }

  @action
  downloadDone() {
    this.downloading = false;
  }

  /**
   * 启动进度条
   */
  @action
  startProgress(showProgress = true) {
    progress.setStatusText('正在生成区块');
    progress.start(showProgress);
  } 

  /**
   * 结束进度条
   */
  endProgress() {
    progress.setStatusText('区块创建完成');
    progress.end();
  }

  resetProgress() {
    progress.reset();
  }

  @action
  open({ blocksPath, projectPath, pageName }) {
    this.blocksPath = path.join(blocksPath, 'components');
    this.projectPath = projectPath;
    this.componentsPath = path.relative(this.projectPath, this.blocksPath);
    this.pageName = pageName;
    this.visible = true;
    this.downloading = false;

    this.lookupPage();
  }

  @action
  close() {
    this.visible = false;
  }

  @action
  lookupPage() {
    const components = readdirSync(this.blocksPath);
    if (Array.isArray(components) && components.length > 0) {
      this.existBlocks = components;
    } else {
      this.existBlocks = [];
    }
  }
}

export default new PageBlockPicker();
