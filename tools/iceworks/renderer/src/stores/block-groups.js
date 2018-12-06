import { observable, action, computed, autorun } from 'mobx';
import uppercamelcase from 'uppercamelcase';
import uuid from 'uuid';
import request from 'request';

import { getBlocks } from '../datacenter/materials';
import blocks from './blocks';

import BlocksSearch from './blocks-search';

/**
 * 用于管理 block group 的 store 管理
 */
class BlockGroups {
  @observable visible = false;
  @observable isLoading = true;
  @observable blocks = []; // 单个区块组合中包含的区块列表
  @observable showModal = false; // 图片预览弹窗
  @observable previewBlocks = []; // 当前预览的区块组合
  @observable blockGroups = [
    {
      name: 'blockGroup1',                 // 区块组合名称
      description: 'some description...',  // 区块组合描述
      blocks: [                            // 包含的区块
          "ability-introduction",   
          "ablity-items"                  // 对应物料源数据区块的 block.name
      ]
    },
    {
      name: 'blockGroup2',                 // 区块组合名称
      description: 'some description...',  // 区块组合描述
      blocks: [                            // 包含的区块
          "about",   
          "ablity-items",                  // 对应物料源数据区块的 block.name
          "ability-introduction"
      ]
    },
    {
      name: 'blockGroup2',                 // 区块组合名称
      description: 'some description...',  // 区块组合描述
      blocks: [                            // 包含的区块
          "about",   
          "ablity-items",                  // 对应物料源数据区块的 block.name
          "ability-introduction"
      ]
    },
    {
      name: 'blockGroup2',                 // 区块组合名称
      description: 'some description...',  // 区块组合描述
      blocks: [                            // 包含的区块
          "about",   
          "ablity-items",                  // 对应物料源数据区块的 block.name
          "ability-introduction"
      ]
    },
    {
      name: 'blockGroup2',                 // 区块组合名称
      description: 'some description...',  // 区块组合描述
      blocks: [                            // 包含的区块
          "about",   
          "ablity-items",                  // 对应物料源数据区块的 block.name
          "ability-introduction"
      ]
    }
  ]; // 区块组合列表

  constructor() {
  
  }

  getBlockGroups() { 
    return new Promise((resolve) => {
      request('https://ice.alicdn.com/pre-assets/block-group.json', (err, res, body) => {
        if (err) {
          console.error('区块组合请求失败', uri); // eslint-disable-line
          resolve(null); // 总数是返回值
        } else {
          resolve(body);
        }
      });
    });
  }

  @action
  fetch() {
    this.isLoading = true;
    this.getBlockGroups()
      .then(this.fetchSuccess)
      .catch(this.fetchFailed);
  }

  @action.bound
  fetchSuccess(body) {
    const blockGroups = JSON.parse(body);
    if (Array.isArray(blockGroups) && blockGroups.length > 0) {
      this.blockGroups = blockGroups;
    } else {
      this.blockGroups = [];
    }
    this.isLoading = false;
  }

  @action.bound
  fetchFailed() {
    this.isLoading = false;
  }

  @action
  openModal = (blocks) => {
    this.showModal = true;
    this.previewBlocks = blocks;
  };

  @action
  closeModal = () => {
    this.showModal = false;
  };

}

export default new BlockGroups();