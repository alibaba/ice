import { observable, action } from 'mobx';
import { remote } from 'electron';
import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import mkdirp from 'mkdirp';
import fecha from 'fecha';
import request from 'request';
import requestProgress from 'request-progress';
import services from '../services';

const defaultWorkspacePath = path.join(os.homedir(), '.iceworks');
const devWorkbenchPath = 'http://127.0.0.1:3333/src/pages/workbench/index.html';
const onlineWorkbenchPath = 'http://ice.alicdn.com/iceland-assets/workbench/v21300/pages/workbench/index.html';
const presentWorkbenchPath = onlineWorkbenchPath;

/**
 * 自定义区块状态管理
 */

class CustomBlocks {
  blockSaving = false;
  materialData = '';
  materialEngine = null;
  blockCounter = 0;
  paintOffset = {};
  paintHeight = 0;
  paintWidth = 0;
  iconData = '';
  dataLoading = false;
  capture = false;
  requestCount = 0;
  @observable blockEditing = false;
  @observable workBenchWindow = null;
  @observable visible = false;
  @observable showCustomBlocks = false;
  @observable isDisabled = false;
  @observable blockName = '';
  @observable blockAlias = '';
  @observable currentBlock = {};
  @observable blockJSON = '';
  @observable blockCode = {};
  @observable blockNameValidation = '';
  @observable renameVisible = false;
  @observable renameBlockName = '';
  @observable renameBlockAlias = '';
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
    //确保目录存在
    mkdirp.sync(path.join(defaultWorkspacePath, 'blocks'));
    mkdirp.sync(path.join(defaultWorkspacePath, 'images'));
    //读取区块文件数据到状态池
    this.initBlocksData();
  }

  initBlocksData() {
    fs.readdirSync(path.join(defaultWorkspacePath, 'blocks')).forEach((element) => {
      this.blocksStorage[element] = JSON.parse(
        fs.readFileSync(
          path.join(defaultWorkspacePath, 'blocks', element),
          'utf8'
        )
      );
    });
  }

  loadMaterialData() {
    if(this.dataLoading){
      this.progressVisible = true;
    }
    if(!this.materialData) {
      this.dataLoading = true;
      this.progressTitle = '下载物料数据';
      requestProgress(
        request(
          'http://ice.alicdn.com/iceland-assets/material-engine-production.json',
          (error, response, body) => {
            if (!error) {
              this.materialData = body;
              this.getEngine('react');
              this.loadIconData();
            } else {
              if (this.requestCount < 3) {
                this.requestCount++;
                this.loadMaterialData();
              } else {
                this.requestCount = 0;
                this.errorVisible = true;
                this.dataLoading = false;
                this.progressVisible = false;
              }
            }
          }),
        {})
      .on('progress', (state) => {
        this.materialProgress = Math.ceil(state.percentage * 50);
        this.progressSpeed = Math.floor(state.speed / 1024);
      });
    }
  }

  loadIconData() {
    if(!this.iconData){
      this.progressTitle = '下载 Iconfont 数据';
      requestProgress(
        request('http://ice.alicdn.com/iceland-assets/iconData.json',
          (error, response, body) => {
            if (!error) {
              this.materialProgress = 100;
              this.iconData = body;
              this.dataLoading = false;
              this.progressVisible = false;
              this.dataTest();
            } else {
              if (this.requestCount < 3) {
                this.requestCount++;
                this.loadIconData();
              } else {
                this.requestCount = 0;
                this.errorVisible = true;
                this.dataLoading = false;
                this.progressVisible = false;
              }
            }
          }),
        {})
        .on('progress', (state) => {
          this.materialProgress = Math.ceil(state.percentage * 50) + 50;
          this.progressSpeed = Math.floor(state.speed / 1024);
        });
    }
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
    this.previewBlock.screenshot = 'data:image/png;base64,' + this.getBlockImg(blockName);
  };

  @action
  closeModal = () => {
    this.showModal = false;
  };

  //重置新建区块和重命名表单
  formReset() {
    this.blockName = '';
    this.blockAlias = '';
    this.blockNameValidation = '';
    this.renameBlock = '';
    this.renameBlockName = '';
    this.renameBlockAlias = '';
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
    //获取区块名默认值
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
    this.resetBlockAlias(this.blocksStorage[name].alias);
  }

  getDefaultBlockName(blockCounter) {
    blockCounter++;
    let blockName = 'block' + blockCounter;
    if(this.blocksStorage.hasOwnProperty(blockName)){
      this.getDefaultBlockName(blockCounter);
    } else {
      this.setBlockName(blockName);
    }
  }

  //表单onChange + 验证
  @action
  setBlockName(value = '') {
    if (value.trim() == '' || !/^[a-z][0-9a-z]*$/i.test(value.trim())) {
      this.blockNameValidation = '区块名须由字母、数字组成, 字母开头';
      this.isDisabled = true;
    } else if(this.blocksStorage.hasOwnProperty(value)) {
      this.isDisabled = true;
      this.blockNameValidation = '区块名重复';
    } else {
      this.blockNameValidation = '';
      this.isDisabled = false;
    }
    this.blockName = value;
  }

  @action
  setBlockAlias(value = '') {
    this.blockAlias = value;
  }

  //表单onChange时表单验证
  @action
  resetBlockName(value = '') {
    if (value.trim() == '' || !/^[a-z][0-9a-z]*$/i.test(value.trim())) {
      this.blockNameValidation = '区块名须由字母、数字组成,字母开头';
      this.isDisabled = true;
    } else if(this.blocksStorage.hasOwnProperty(value) && this.renameBlock != value) {
      this.isDisabled = true;
      this.blockNameValidation = '区块名重复';
    } else {
      this.blockNameValidation = '';
      this.isDisabled = false;
    }
    this.renameBlockName = value;
  }

  @action
  resetBlockAlias(value = '') {
    this.renameBlockAlias = value;
  }

  @action
  refactorBlock() {
    if(this.renameBlock !== this.renameBlockName || this.renameBlockAlias !== this.blocksStorage[this.renameBlockName].alias) {
      this.blockEditing = true;
      this.refactorBlockFiles(this.renameBlock);
      this.blocksStorage[this.renameBlockName] = this.deepClone(this.blocksStorage[this.renameBlock]);
      this.blocksStorage[this.renameBlockName].alias = this.renameBlockAlias;
      if(this.renameBlock !== this.renameBlockName) {
        this.deleteBlock(this.renameBlock);
      }
      this.blockEditing = false;
      this.formReset();
    }
  }

  refactorBlockFiles(blockName) {
    const blockData = fs.readFileSync(path.join(defaultWorkspacePath, 'blocks', blockName), 'utf8');
    const newBlockData = JSON.parse(blockData);
    newBlockData.alias = this.renameBlockAlias;
    fs.writeFileSync(path.join(defaultWorkspacePath, 'blocks', this.renameBlockName), JSON.stringify(newBlockData));
    const imageData = fs.readFileSync(path.join(defaultWorkspacePath, 'images', blockName));
    fs.writeFileSync(path.join(defaultWorkspacePath, 'images', this.renameBlockName), imageData);
  }

  @action
  dataTest() {
    if(!this.materialData || !this.iconData){
      this.progressVisible = true;
      this.loadMaterialData();
    } else {
      this.openWorkBench();
    }
  }

  @action
  openWorkBench() {
    if(!this.materialData || !this.iconData){
      return this.dataTest();
    }
    if(!this.workBenchWindow) {
      this.workBenchEventsBinding();
      if(this.blockJSON){
        this.workBenchWindow.webContents.setUserAgent(JSON.stringify({
          name: this.blockName,
          json: this.blockJSON,
        }));
      } else {
        this.workBenchWindow.webContents.setUserAgent(JSON.stringify({
          name: this.blockName
        }));
      }
    }
  }

  @action
  editBlock(name) {
    this.blockName = name;
    this.blockCode = this.blocksStorage[name]['code'];
    this.blockAlias = this.blocksStorage[name]['alias'];
    this.blockJSON = this.blocksStorage[name]['json'];
    this.dataTest();
  }

  workBenchEventsBinding() {
    this.blockEditing = true;
    this.workBenchWindow = new remote.BrowserWindow({
      title: "ICELAND - 区块搭建",
      width: 1280,
      minWidth: 1186,
      height: 720,
      minHeight: 720,
      show: false
    });
    this.workBenchWindow.once('ready-to-show', () => {
      this.workBenchWindow.show();
    });
    this.workBenchWindow.loadURL(presentWorkbenchPath);
    this.workBenchWindow.webContents.executeJavaScript("window.IceLand.materialData = " + this.materialData, true);
    //回调参数和官方文档描述不符
    this.workBenchWindow.webContents.on('console-message', (level, sourceId, message, line) => {
      console.log(message, line);
      if(line == 133 || line == 125){
        const passBackData = JSON.parse(message);
        if(passBackData){
          if (passBackData.type === 'icon') {
            this.workBenchWindow.webContents.executeJavaScript("window.IceLand.iconData = " + this.iconData, true);
          } else if (passBackData.type === 'offset') {
            this.paintOffset = passBackData.value;
          } else if (passBackData.type === 'height') {
            this.paintHeight = passBackData.value + 72;
          } else if (passBackData.type === 'width') {
            this.paintWidth = passBackData.value + 72;
            this.capture = true;
          } else if (passBackData.type === 'Group') {
            this.blockSaving = true;
            let JSONObj = passBackData;
            JSONObj.props.style.position = 'relative';
            this.blockJSON = JSON.stringify(JSONObj);
            this.jsonTransfer();
          }
        }
      }
    });
    this.workBenchWindow.on('closed', () => {
      this.workBenchWindow = null;
      this.formReset();
    });
    this.workBenchWindow.on('close', (event) => {
      if(!this.blockSaving){
        this.workBenchWindow.destroy();
        this.blockJSON = '';
        this.blockEditing = false;
      } else {
        event.preventDefault();
      }
    });
  }

  //json转代码 + 抽取依赖 + 代码美化
  jsonTransfer() {
    let json = JSON.parse(this.blockJSON);
    services.customBlocks.dsl2code(json, this.materialEngine, this.saveCustomBlock);
  }

  saveCustomBlock = (deps, code) => {
    this.blockDeps = deps;
    this.blockCode = JSON.parse(code);
    this.currentBlock = {
      json: this.blockJSON,
      alias: this.blockAlias,
      code: this.blockCode,
      type: 'custom',
      time: fecha.format(new Date(),'YYYY-MM-DD HH:mm:ss'),
      dep: this.blockDeps
    };
    fs.writeFileSync(path.join(defaultWorkspacePath, 'blocks', this.blockName), JSON.stringify(this.currentBlock));
    if(this.capture){
      this.workBenchWindow.capturePage({
        x: Math.floor(this.paintOffset.left),
        y: Math.floor(this.paintOffset.top),
        width: Math.floor(this.paintWidth),
        height: Math.floor(this.paintHeight)
      }, (img) => {
        fs.writeFile(path.join(defaultWorkspacePath, 'images', this.blockName), img.toPNG(), () => {
          this.refreshBlocks();
          this.blockSaving = false;
          this.blockJSON = '';
          this.capture = false;
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
    fs.remove(path.join(defaultWorkspacePath, 'blocks', name), (error) => {
      if (error) {
        console.error(error);
      } else {
        console.info('删除区块数据');
      }
    });
    fs.remove(path.join(defaultWorkspacePath, 'images', name), (error) => {
      if (error) {
        console.error(error);
      } else {
        console.info('删除区块截图');
      }
    });
  }
}

export default new CustomBlocks();
