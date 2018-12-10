import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Block, PreviewModal as BlockPreviewModal } from '../Block';
import CustomBlock from '../Block/CustomBlock';

import './index.scss';

@observer
class BlockCategory extends Component {
  static propTypes = {
    handleBlocksAdd: PropTypes.func,
  };

  static defaultProps = {
    handleBlocksAdd: () => {},
  };

  render() {
    let { blocksWithCategory, originKeywords, idPrefix, handleBlocksAdd } = this.props;
    if (blocksWithCategory == undefined) {
      return <div className="blocks-empty-tip">loading...</div>;
    } else if (
      Array.isArray(blocksWithCategory) &&
      blocksWithCategory.length == 0 &&
      originKeywords
    ) {
      return (
        <div className="blocks-empty-tip">
          没有找到
          <span style={{ fontWeight: 400, color: '#3080fe', padding: '0 5px' }}>
            {originKeywords}
          </span>
          相关的区块
        </div>
      );
    } else if (
      Array.isArray(blocksWithCategory) &&
      blocksWithCategory.length == 0
    ) {
      return <div className="blocks-empty-tip">暂无可用区块...</div>;
    } else {
      return (
        <div className="blocks-wrapper">
          {blocksWithCategory.map(({ category, blocks }, index) => {
            if (blocks.length == 0) {
              return null;
            }
            const blockPanelId = `${idPrefix}${index}`;
            return (
              <div className="block-category" key={category}>
                <div id={blockPanelId}>
                  <div className="block-category-title">
                    {category}
                    <span>({blocks.length})</span>
                  </div>
                  <div className="block-category-body">
                    {blocks.map((block) => {
                      return (
                        <Block
                          key={`${category}-${block.name}`}
                          block={block}
                          originKeywords={originKeywords}
                          handleBlocksAdd={handleBlocksAdd}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <BlockPreviewModal />
        </div>
      );
    }
  }
}

export default BlockCategory;
