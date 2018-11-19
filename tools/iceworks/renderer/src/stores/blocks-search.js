import { observable, action, computed, toJS } from 'mobx';
import { getCategoriesByBlocks } from '../datacenter/materials';

/**
 * 用于区块选择面板管理区块状态
 */
class MaterialBlocks {
  @observable
  keywords = [];
  @observable
  newBlocks = [];

  constructor(material) {
    const categories = getCategoriesByBlocks(material.data);
    // 全部分类

    this.name = material.name;
    this.source = material.source;
    this.originBlocks = this.additionalIsNew(material.data);
    this.categories = categories;
  }

  @action
  setKeywords(key) {
    this.keywords = key;
  }

  additionalIsNew = (blocks) => {
    const sortBlocks = blocks.filter((block) => {
      return !!block.publishTime;
    });

    if (sortBlocks.length == 0) {
      return blocks;
    }

    let isNewlyBlock = [];
    let days = 0;
    const nowDate = new Date();
    while (!isNewlyBlock.length) {
      days = days + 7;
      // eslint-disable-next-line no-loop-func
      sortBlocks.forEach((item) => {
        const blockCreatedDate = new Date(item.publishTime);
        const _isNew = nowDate - blockCreatedDate < days * 24 * 60 * 60 * 1000;
        if (_isNew) {
          isNewlyBlock.push(item);
        }
        item._isNew = _isNew;
      });
    }
    this.newBlocks = isNewlyBlock;
    return blocks;
  };

  @computed
  get blocks() {
    const categories = this.categories;
    const blocks = observable.map({});
    categories.forEach((category) => {
      const blocksCategory = this.getBlocksFilterByCategory(category.name);
      blocks.set(category.name, blocksCategory);
    });
    return blocks;
  }
  @computed
  get blocksWithCategory() {
    const result = [];
    if (
      Array.isArray(this.newBlocks) &&
      this.newBlocks.length > 0 &&
      this.keywords &&
      this.keywords.length == 0
    ) {
      result.push({
        category: '最新',
        blocks: this.newBlocks,
      });
    }

    for (let key of this.blocks.keys()) {
      result.push({
        category: key,
        blocks: toJS(this.blocks.get(key)),
      });
    }

    return result;
  }

  getBlocksFilterByCategory(name) {
    if (this.keywords && this.keywords.length > 0) {
      return this.originBlocks.filter((block) => {
        const blockKeywords = [block.title, block.name, block.description]
          .join(' ')
          .toLowerCase();
        const matched = this.keywords.some((key) => {
          return blockKeywords.indexOf(key) !== -1;
        });

        return block.categories.includes(name) && matched;
      });
    } else {
      return this.originBlocks.filter((block) => {
        return block.categories.includes(name);
      });
    }
  }
}

export default MaterialBlocks;
