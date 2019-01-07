import { observable, action, computed, autorun } from 'mobx';
import uppercamelcase from 'uppercamelcase';
import uuid from 'uuid';

import { getBlocks } from '../datacenter/materials';
import { RECOMMEND_MATERIALS } from '../datacenter/materialsConfig';
import projects from './projects';
import blockGroups from './block-groups';

import BlocksSearch from './blocks-search';

/**
 * 用于管理 block picker 的 store 管理
 */
class Blocks {
  @observable
  visible = false;
  @observable
  isLoading = true;
  @observable
  keywords = [];
  @observable
  originKeywords = ''; // 原搜索关键词
  @observable
  materialsValue = []; // 物料源列表
  @observable
  originBlocks = [];
  @observable
  categories = [];
  @observable
  selected = []; // 区块选择器已选择的区块
  @observable
  isSorting = false;
  @observable
  showModal = false; // 图片预览弹窗
  @observable
  previewBlock = {}; // 当前预览的区块
  @observable
  currentTabKey = '0'; // 记录当前选中的Tab

  constructor() {
    autorun(() => {
      // 每次展开数据清空
      if (this.visible) {
        this.reset();
      }
    });
  }

  @action
  reset() {
    this.selected = [];
    this.keywords = [];
    this.originKeywords = '';
    this.currentTabKey = '0'; // tab重置
  }

  @action
  fetch() {
    this.isLoading = true;
    this.type = projects.currentProject.getLibraryType();
    // 展示当前框架库类型匹配的区块
    getBlocks(this.type)
      .then(this.fetchSuccess)
      .catch(this.fetchFailed);
  }

  @action.bound
  fetchSuccess(materials) {
    const materialsValue = [];
    if (Array.isArray(materials) && materials.length > 0) {
      materials.forEach((material) => {
        materialsValue.push(new BlocksSearch(material));
      });
      this.reset();
      this.materialsValue = materialsValue; // 所有 blocks 数据
      const { iceMaterial, iceIndex } = this.getIceMaterial();

      // materials 中有飞冰物料时，处理飞冰组合推荐
      if (iceMaterial) {
        // tab 中加塞飞冰组合推荐。这里提前加塞，为了渲染tab不出现抖动
        this.materialsValue = this.addBlockGroupsMaterial(iceMaterial, iceIndex);
        // fetch组合推荐
        blockGroups.fetch();
      }
      
      this.isLoading = false;
    } else {
      this.reset();
      this.materialsValue = [];
      this.isLoading = false;
    }
  }

  // materials 中有飞冰物料时，加塞飞冰组合推荐
  @action
  addBlockGroupsMaterial(iceMaterial, iceIndex) {
    if (iceIndex !== -1) {
      const formatMaterials = this.materialsValue.slice();
      formatMaterials.splice(iceIndex + 1, 0 , {
        name: '飞冰区块组合',
        key: 'iceBlockGroups'
      });
      return formatMaterials;
    }
    return this.materialsValue;
  }

  @action.bound
  fetchFailed() {
    this.isLoading = false;
  }

  @computed
  get materials() {
    return this.materialsValue;
  }

  timer = null;
  // search 关键字搜索
  @action
  search(key) {
    this.originKeywords = key;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.searchDelay(key);
    }, 150);
  }

  @action.bound
  searchDelay(key) {
    this.keywords = key
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    this.materialsValue.forEach((materila) => {
      materila.setKeywords(this.keywords);
    });
  }

  /* =============== 弹窗相关 ================ */
  @action
  open() {
    this.visible = true;
  }

  @action
  close() {
    this.visible = false;
  }

  @action
  openModal = (block) => {
    this.showModal = true;
    this.previewBlock = block;
  };

  @action
  closeModal = () => {
    this.showModal = false;
  };

  formatBlockName(name) {
    return name.replace('@', '').replace(/\//g, '-');
  }

  // block 选中、排序，管理等操作

  @action
  addBlock(block, existBlocks = []) {
    let blockClassName = this.formatBlockName(block.name);

    if (block.aliasUpper !== false) {
      blockClassName = uppercamelcase(blockClassName);
    }

    const aliasName = this.generateBlockAliasName(
      blockClassName,
      0,
      existBlocks
    );
    this.selected.push({
      ...block,
      uid: uuid.v1(), // 模块渲染唯一值
      alias: aliasName,
    });
  }

  @action
  addCustomBlock(block, blockName, existBlocks = []) {
    const blockClassName = uppercamelcase(this.formatBlockName(blockName));
    const aliasName = this.generateBlockAliasName(blockName, 0, existBlocks);
    this.selected.push({
      ...block,
      blockName: blockName,
      uid: uuid.v1(), // 模块渲染唯一值
      alias: aliasName,
    });
  }

  generateBlockAliasName(blockAlias, count, existBlocks) {
    const name = count == 0 ? blockAlias : blockAlias + count;
    const isConflict =
      this.selected.some((block) => {
        return block.alias === name;
      }) ||
      existBlocks.some((blockName) => {
        return blockName === name;
      });

    // TODO 验证名称冲突
    if (isConflict) {
      return this.generateBlockAliasName(blockAlias, count + 1, existBlocks);
    } else {
      return name;
    }
  }

  @action.bound
  getIceMaterial() {
    let iceIndex = -1;
    // 获取配置中的ice物料源source；
    const { source } = RECOMMEND_MATERIALS.find( recommendMaterial => {
      return recommendMaterial.key === 'ice';
    });
    // 获取ice物料源及对应的index
    const iceMaterial = this.materialsValue.find( (material, index) => {
      if (material.source === source) {
        iceIndex = index;
        return true
      }
    });
    return {iceMaterial, iceIndex};
  }

  // 开始拖拽排序区块
  @action
  onSortStart = () => {
    this.isSorting = true;
  };

  // 结束拖拽排序区块
  @action
  onSortEnd = ({ oldIndex, newIndex }, event) => {
    this.isSorting = false;
    this.selected = arrayMove(this.selected, oldIndex, newIndex);
  };

  // 删除 Block
  @action
  removeBlock(orderIndex) {
    this.selected.splice(orderIndex, 1);
  }

  // 修改 block 别名
  @action
  blockModifyAlias(orderIndex, newAlias) {
    this.selected = this.selected.map((block, index) => {
      if (index == orderIndex) {
        block.alias = this.formatBlockName(newAlias);
      }
      return block;
    });
  }

  pageNameConflict(pageName) {
    const blocksNames = this.selected.map((b) => b.alias.toLowerCase()); // 已经存在的 block 名称
    let confilict = '';
    if (blocksNames.includes(pageName.toLowerCase())) {
      confilict = pageName;
    }
    return confilict;
  }

  @action
  setCurrentTabKey(key) {
    this.currentTabKey = key;
  }
}

function arrayMove(arr, previousIndex, newIndex) {
  const array = arr.slice(0);
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}


export default new Blocks();
