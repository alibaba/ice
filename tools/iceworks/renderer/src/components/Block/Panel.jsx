import { observer } from 'mobx-react';
import React, { Component } from 'react';

import BlockCategory from '../BlockCategory/';
import BlockSlider from '../BlockSlider/';
import EmptyTips from '../EmptyTips/';

@observer
class Panel extends Component {
  constructor(props) {
    super(props);

    this.idPrefix = 'Block-' + Date.now().toString(32) + '-';
  }

  handleCategorySlideChange = (index) => {
    const id = '#' + this.idPrefix + index;
    const title = document.querySelector(id);

    title.scrollIntoView({
      behavior: 'instant',
      block: 'start',
      inline: 'start',
    });
  };

  render() {
    const { material = {} } = this.props;
    const blocks = (material && material.blocks) || null;

    if (!blocks) {
      return <EmptyTips size={120}>加载中...</EmptyTips>;
    }

    if (Array.isArray(blocks.values) && blocks.values.length == 0) {
      return (
        <div style={{ padding: 10 }}>
          <EmptyTips size={120}>当前物料源暂无区块</EmptyTips>
        </div>
      );
    }

    const blocksWithCategory = blocks.blocksWithCategory;

    return (
      <div style={styles.wrapper}>
        <BlockSlider
          onClick={this.handleCategorySlideChange}
          blocksWithCategory={blocksWithCategory}
        />
        <BlockCategory
          idPrefix={this.idPrefix}
          blocksWithCategory={blocksWithCategory}
        />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    flex: 'auto',
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'column',
  },
};

export default Panel;
