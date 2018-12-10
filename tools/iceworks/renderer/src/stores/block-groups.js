import { observable, action } from 'mobx';
import request from 'request';
import { BLOCK_GROUPS_MATERIALS } from '../datacenter/materialsConfig';

/**
 * 用于管理 block groups 的 store 管理
 */
class BlockGroups {
  @observable visible = false;
  @observable isLoading = true;
  @observable blocks = []; // 单个区块组合中包含的区块列表
  @observable showModal = false; // 图片预览弹窗
  @observable previewBlocks = []; // 当前预览的区块组合
  @observable blockGroups = []; // 区块组合列表

  getBlockGroups() { 
    return new Promise((resolve) => {
      request(BLOCK_GROUPS_MATERIALS.source, (err, res, body) => {
        if (err) {
          console.error('区块组合请求失败', uri); // eslint-disable-line
          resolve(null); // 总数是返回值
        } else {
          resolve(body);
        }
      });
    });
  };

  @action
  fetch() {
    this.isLoading = true;
    this.getBlockGroups()
      .then(this.fetchSuccess)
      .catch(this.fetchFailed);
  };

  @action.bound
  fetchSuccess(body) {
    const blockGroups = JSON.parse(body);
    if (Array.isArray(blockGroups) && blockGroups.length > 0) {
      this.blockGroups = blockGroups;
    } else {
      this.blockGroups = [];
    }
    this.isLoading = false;
  };

  @action.bound
  fetchFailed() {
    this.isLoading = false;
  };

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