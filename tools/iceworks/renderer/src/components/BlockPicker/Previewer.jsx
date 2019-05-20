import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import { Button, Icon } from '@icedesign/base';

import BlockPreview from '../BlockPreview';
import PreviewTitle from './PreviewTitle';
import PreviewTips from './PreviewTips';

const SortableBlockPreview = SortableContainer(
  ({ blocks, onSortEnd, onAliasChange, onRemove }) => {
    return (
      <div className="page-editor-preview">
        {blocks.map((block, index) => {
          return (
            <BlockPreview
              index={index}
              key={`${block.uid}`}
              block={block}
              useDragHandle={true}
              orderIndex={index}
              orderCount={blocks.length}
              onSortEnd={onSortEnd}
              onRemove={onRemove}
              onAliasChange={onAliasChange}
            />
          );
        })}
      </div>
    );
  }
);

@inject('blocks', 'localBlocks', 'pageBlockPicker')
@observer
class Previewer extends Component {
  static propTypes = {
    blocks: PropTypes.object,
    text: PropTypes.string,
    title: PropTypes.string,
    src: PropTypes.string,
  };

  // 移除页面模块
  handleRemovePageBlock = (orderIndex) => {
    this.props.blocks.removeBlock(orderIndex);
  };

  // 修改 block 别名
  handleAliasChangeBlock = (orderIndex, newAlias) => {
    this.props.blocks.blockModifyAlias(orderIndex, newAlias);
  };

  /**
   * 打开搭建本地区块 dialog
   */
  handleOpenBuildBlock = () => {
    const { localBlocks, pageBlockPicker, blocks } = this.props;
    localBlocks.openWorkBench(false, (block, blockName) => {
      blocks.addCustomBlock(block, blockName, pageBlockPicker.existBlocks);
      return true;
    });
  };

  render() {
    const { blocks = {}, title, text, src } = this.props;
    return (
      <div className="preview-wrapper">
        <div className="preview-button-group">
          <Button onClick={this.handleOpenBuildBlock} type="primary">
            <Icon size="small" type="edit" />
            <span>快速生成表单区块</span>
          </Button>
        </div>
        {blocks.selected.length ? (
          <PreviewTitle title={title} count={blocks.selected.length} />
        ) : (
          <PreviewTips text={text} src={src} />
        )}

        <SortableBlockPreview
          lockAxis="y"
          helperClass={'preview-block-draging'}
          useDragHandle={true}
          blocks={blocks.selected}
          onSortStart={blocks.onSortStart}
          onSortEnd={blocks.onSortEnd}
          onRemove={this.handleRemovePageBlock}
          onAliasChange={this.handleAliasChangeBlock}
        />
      </div>
    );
  }
}

export default Previewer;
