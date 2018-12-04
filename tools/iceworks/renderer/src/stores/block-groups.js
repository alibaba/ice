import { observable, action, computed, autorun } from 'mobx';
import uppercamelcase from 'uppercamelcase';
import uuid from 'uuid';

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
  @observable previewBlockGroup = {}; // 当前预览的区块
  @observable blockGroups = [
    {
      name: 'blockGroup1',                 // 区块组合名称
      description: 'some description...',  // 区块组合描述
      blocks: [                            // 包含的区块
          "ability-introduction",   
          "ablity-items",                  // 对应物料源数据区块的 block.name
          "about"
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

  @action
  openModal = (blockGroup) => {
    this.showModal = true;
    this.previewBlockGroup = blockGroup;
  };

  @action
  closeModal = () => {
    this.showModal = false;
  };

}

export default new BlockGroups();