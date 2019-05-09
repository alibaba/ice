import { computed, toJS, observable } from 'mobx';

class AdditionalScaffolds {
  @observable
  activeCategory = '全部';

  constructor(scaffolds, material) {
    this.material = material || '';
    this.scaffoldsValue = this.additionalIsNew(scaffolds);
    this.startRecommendScaffolds = this.startRecommendScaffolds(scaffolds);
  }


  additionalIsNew = (scaffolds) => {
    const sortScaffolds = scaffolds.filter((scaffold) => {
      return !!scaffold.publishTime;
    });

    if (sortScaffolds.length === 0) {
      return sortScaffolds;
    }

    const isNewlyScaffold = [];
    let days = 0;
    const nowDate = new Date();
    while (!isNewlyScaffold.length) {
      days += 7;
      // eslint-disable-next-line no-loop-func
      sortScaffolds.forEach((item) => {
        const blockCreatedDate = new Date(item.publishTime);
        /* eslint-disable no-underscore-dangle */
        const _isNew = nowDate - blockCreatedDate < days * 24 * 60 * 60 * 1000;
        if (_isNew) {
          isNewlyScaffold.push(item);
        }
        item._isNew = _isNew;
        /* eslint-enable no-underscore-dangle */
      });
    }
    return sortScaffolds;
  };

  /**
   * 启动界面的推荐模板配置
   */
  startRecommendScaffolds = (scaffolds) => {
    const RECOMMEND_SCAFFOLDS = [
      '@icedesign/pro-scaffold',
      '@icedesign/lite-scaffold',
    ];
    return scaffolds.filter((scaffold) => {
      return RECOMMEND_SCAFFOLDS.includes(scaffold.source.npm);
    });
  };

  /**
   * 获取模板的分类
   */
  @computed
  get categories() {
    // 默认展示全部
    const categories = [];

    this.scaffoldsValue.forEach((item) => {
      if (Array.isArray(item.categories)) {
        item.categories.forEach((currentValue) => {
          if (!categories.includes(currentValue)) {
            categories.push(currentValue);
          }
        });
      }
    });

    if (categories.length > 0) {
      categories.unshift('全部');
    }

    return categories;
  }

  @computed
  get values() {
    if (this.activeCategory === '全部') {
      return this.scaffolds;
    }
    const filterByCatefory = this.scaffolds.filter((item) => {
      if (item.categories.includes(this.activeCategory)) {
        return item;
      }
      return false;
    });

    return toJS(filterByCatefory);
  }

  @computed
  get scaffolds() {
    return toJS(this.scaffoldsValue);
  }

  @computed
  get recommendScaffolds() {
    return toJS(this.startRecommendScaffolds);
  }
}

export default AdditionalScaffolds;
