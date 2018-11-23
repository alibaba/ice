import { observable, computed, toJS } from 'mobx';

import { getCategoriesByBlocks } from '../datacenter/materials';

class AdditionalBlocks {
  @observable
  newBlocks = [];

  constructor(blocks) {
    const categories = getCategoriesByBlocks(blocks);
    this.originBlocks = this.additionalIsNew(blocks);
    this.categories = categories;
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
  get blocksWithCategory() {
    const result = [];
    if (Array.isArray(this.newBlocks) && this.newBlocks.length > 0) {
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
    return this.originBlocks.filter((block) => {
      return block.categories.includes(name);
    });
  }

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
  get values() {
    return this.originBlocks;
  }
}

export default AdditionalBlocks;
