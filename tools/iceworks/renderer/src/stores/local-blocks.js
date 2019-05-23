import os from 'os';
import path from 'path';
import { observable, action } from 'mobx';
import { remote } from 'electron';
import fs from 'fs-extra';
import mkdirp from 'mkdirp';
import fecha from 'fecha';
import services from '../services';
import logger from '../lib/logger';

const defaultWorkspacePath = path.join(os.homedir(), '.iceworks');
// const designPath = 'http://127.0.0.1:4445/src/pages/Design';
const designPath = 'https://g.alicdn.com/iceland/iceland-page/design.html';
const presentWorkbenchPath = designPath;

const LOCAL_BLOCK_DIR_NAME = 'localBlocks';
const TEMPORARY_BLOCK_DIR_NAME = 'temporaryBlocks';
const BLOCK_DIR = path.join(defaultWorkspacePath, LOCAL_BLOCK_DIR_NAME);
const TEMPORARY_BLOCK_DIR = path.join(defaultWorkspacePath, TEMPORARY_BLOCK_DIR_NAME);
// 跟 webview 通信约定的字段
const MESSAGE_FLAG = 'saveSceneData: ';

/**
 * 本地区块状态管理
 */

class LocalBlocks {
  blockSaving = false;

  materialData = '';

  materialEngine = null;

  blockCounter = 0;

  paintOffset = {};

  paintHeight = 0;

  paintWidth = 0;

  iconData = '';

  capture = false;

  requestCount = 0;

  @observable isHasInitBlocks = false;

  @observable blockEditing = false;

  @observable workBenchWindow = null;

  @observable visible = false;

  @observable showCustomBlocks = false;

  @observable isDisabled = false;

  @observable blockName = '';

  @observable currentBlock = {};

  @observable blockJSON = '';

  @observable blockCode = {};

  @observable blockNameValidation = '';

  @observable renameVisible = false;

  @observable renameBlockName = '';

  @observable renameBlock = '';

  @observable blockDeps = [];

  @observable blocksStorage = {};

  @observable showModal = false;

  @observable previewBlock = {};

  @observable materialProgress = 0;

  @observable progressVisible = false;

  @observable progressRemaining = 0;

  @observable progressSpeed = 0;

  @observable progressTitle = '';

  @observable errorVisible = false;

  deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  initCustomBlocks() {
    // if has init, skip
    if (this.isHasInitBlocks) {
      return;
    }
    // 确保目录存在
    mkdirp.sync(BLOCK_DIR);
    mkdirp.sync(TEMPORARY_BLOCK_DIR);
    mkdirp.sync(path.join(defaultWorkspacePath, 'images'));
    // 读取区块文件数据到状态池
    this.initBlocksData();
  }

  initBlocksData() {
    fs.readdirSync(BLOCK_DIR).forEach((element) => {
      this.blocksStorage[element] = JSON.parse(
        fs.readFileSync(
          path.join(defaultWorkspacePath, LOCAL_BLOCK_DIR_NAME, element),
          'utf8'
        )
      );
    });
  }

  getEngine() {
    if (!this.materialEngine) {
      this.materialEngine = services.customBlocks.getEngine(JSON.parse(this.materialData));
    }
  }

  @action
  openProgress = () => {
    this.progressVisible = true;
  };

  @action
  closeProgress = () => {
    this.progressVisible = false;
  };

  @action
  closeError = () => {
    this.errorVisible = false;
  };

  @action
  openModal = (blockName) => {
    this.showModal = true;
    this.previewBlock.name = blockName;
    this.previewBlock.screenshot = `data:image/png;base64,${this.getBlockImg(blockName)}`;
  };

  @action
  closeModal = () => {
    this.showModal = false;
  };

  // 重置新建区块和重命名表单
  formReset() {
    this.blockName = '';
    this.blockNameValidation = '';
    this.renameBlock = '';
    this.renameBlockName = '';
  }

  @action
  getBlockImg(blockName) {
    try {
      const img = fs.readFileSync(path.join(defaultWorkspacePath, 'images', blockName), 'base64');
      return img;
    } catch (e) {
      return '';
    }
  }

  @action
  close() {
    this.visible = false;
  }

  @action
  open() {
    this.visible = true;
    // 获取区块名默认值
    this.blockCounter = Object.keys(this.blocksStorage).length;
    this.getDefaultBlockName(this.blockCounter);
  }

  @action
  renameClose() {
    this.renameVisible = false;
  }

  @action
  renameOpen(name) {
    this.renameVisible = true;
    this.renameBlockName = name;
    this.renameBlock = name;
  }

  getDefaultBlockName(blockCounter) {
    blockCounter++;
    const blockName = `block${blockCounter}`;
    if (Object.prototype.hasOwnProperty.call(this.blocksStorage, blockName)) {
      this.getDefaultBlockName(blockCounter);
    } else {
      this.setBlockName(blockName);
    }
  }

  // 表单onChange + 验证
  @action
  setBlockName(value = '') {
    this.blockNameValidation = '';
    this.isDisabled = false;
    this.blockName = value;
  }

  // 表单onChange时表单验证
  @action
  resetBlockName(value = '') {
    if (value.trim() === '' || !/^[a-z][0-9a-z]*$/i.test(value.trim())) {
      this.blockNameValidation = '区块名须由字母、数字组成,字母开头';
      this.isDisabled = true;
    } else if (Object.prototype.hasOwnProperty.call(this.blocksStorage, value) && this.renameBlock !== value) {
      this.isDisabled = true;
      this.blockNameValidation = '区块名重复';
    } else {
      this.blockNameValidation = '';
      this.isDisabled = false;
    }
    this.renameBlockName = value;
  }

  @action
  refactorBlock() {
    if (this.renameBlock !== this.renameBlockName) {
      this.blockEditing = true;
      this.refactorBlockFiles(this.renameBlock);
      this.blocksStorage[this.renameBlockName] = this.deepClone(this.blocksStorage[this.renameBlock]);
      if (this.renameBlock !== this.renameBlockName) {
        this.deleteBlock(this.renameBlock);
      }
      this.blockEditing = false;
      this.formReset();
    }
  }

  refactorBlockFiles(blockName) {
    const blockData = fs.readFileSync(path.join(defaultWorkspacePath, LOCAL_BLOCK_DIR_NAME, blockName), 'utf8');
    const newBlockData = JSON.parse(blockData);
    fs.writeFileSync(path.join(defaultWorkspacePath, LOCAL_BLOCK_DIR_NAME, this.renameBlockName), JSON.stringify(newBlockData));
    const imageData = fs.readFileSync(path.join(defaultWorkspacePath, 'images', blockName));
    fs.writeFileSync(path.join(defaultWorkspacePath, 'images', this.renameBlockName), imageData);
  }

  @action
  dataTest() {
    this.openWorkBench();
  }

  @action
  openWorkBench(needSave = true, callback) {
    if (!this.workBenchWindow) {
      if (!needSave) {
        this.blockName = `LocalForm-${Date.now()}`;
      }
      this.workBenchEventsBinding(needSave, callback);
      if (this.blockJSON) {
        this.workBenchWindow.webContents.setUserAgent(JSON.stringify({
          name: this.blockName,
          json: this.blockJSON,
          needSave,
        }));
      } else {
        this.workBenchWindow.webContents.setUserAgent(JSON.stringify({
          name: this.blockName,
          needSave,
        }));
      }
    }
  }

  @action
  editBlock(name) {
    this.blockName = name;
    this.blockCode = this.blocksStorage[name].code;
    this.blockJSON = this.blocksStorage[name].json;
    this.dataTest();
  }

  workBenchEventsBinding(needSave, callback) {
    this.blockEditing = true;
    this.workBenchWindow = new remote.BrowserWindow({
      title: this.blockName ? `搭建 ${this.blockName}` : '表单搭建',
      width: 1280,
      minWidth: 1186,
      height: 720,
      minHeight: 720,
      show: false,
    });
    this.workBenchWindow.once('ready-to-show', () => {
      this.workBenchWindow.show();
    });
    this.workBenchWindow.loadURL(presentWorkbenchPath);
    // 回调参数和官方文档描述不符
    this.workBenchWindow.webContents.on('console-message', (level, sourceId, message, line) => {
      logger.info(message, line);
      if (message.indexOf(MESSAGE_FLAG) === 0) {
        const validMessage = message.substring(15);
        const passBackData = JSON.parse(validMessage);
        if (passBackData) {
          this.capture = true;
          const { json } = passBackData;
          this.blockJSON = JSON.stringify(json);
          this.saveCustomBlock({
            ...passBackData,
            needSave,
            callback,
          });
        }
      }
    });
    this.workBenchWindow.on('closed', () => {
      this.workBenchWindow = null;
      this.formReset();
    });
    this.workBenchWindow.on('close', (event) => {
      if (!this.blockSaving) {
        this.workBenchWindow.destroy();
        this.blockJSON = '';
        this.blockEditing = false;
      } else {
        event.preventDefault();
      }
    });
  }

  saveCustomBlock = ({ deps, code, paintRect, needSave, callback }) => {
    this.blockDeps = deps;
    this.blockCode = code;
    this.currentBlock = {
      json: this.blockJSON,
      code: this.blockCode,
      type: 'custom',
      time: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      dep: deps,
    };
    // no need save form block will be put temporary dir
    fs.writeFileSync(
      path.join(defaultWorkspacePath, needSave ? LOCAL_BLOCK_DIR_NAME : TEMPORARY_BLOCK_DIR_NAME, this.blockName),
      JSON.stringify(this.currentBlock)
    );
    if (this.capture) {
      this.workBenchWindow.capturePage({
        x: paintRect.x,
        y: paintRect.y,
        width: paintRect.width,
        height: paintRect.height,
      }, (img) => {
        fs.writeFile(path.join(defaultWorkspacePath, 'images', this.blockName), img.toPNG(), () => {
          this.refreshBlocks();
          this.blockSaving = false;
          this.blockJSON = '';
          this.capture = false;
          if (callback) {
            const isCloseWindow = callback(this.currentBlock, this.blockName);
            if (isCloseWindow) {
              this.workBenchWindow.close();
            }
          }
        });
      });
    }
  };

  refreshBlocks = () => {
    this.blocksStorage[this.blockName] = this.deepClone(this.currentBlock);
  };

  @action
  deleteBlock(name) {
    delete this.blocksStorage[name];
    fs.remove(path.join(defaultWorkspacePath, LOCAL_BLOCK_DIR_NAME, name), (error) => {
      if (error) {
        logger.error(error);
      } else {
        logger.info('删除区块数据');
      }
    });
    fs.remove(path.join(defaultWorkspacePath, 'images', name), (error) => {
      if (error) {
        logger.error(error);
      } else {
        logger.info('删除区块截图');
      }
    });
  }
}

export default new LocalBlocks();
