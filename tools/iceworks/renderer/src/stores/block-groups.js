import { observable, action } from 'mobx';
import requestMaterial from '../lib/request-material';
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
    const uri = BLOCK_GROUPS_MATERIALS.source;
    return requestMaterial(uri, true);
  };

  @action
  fetch() {
    this.isLoading = true;
    return this.getBlockGroups().then(this.fetchSuccess);
  };

  @action.bound
  fetchSuccess(body) {
    this.blockGroups = body || [];
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