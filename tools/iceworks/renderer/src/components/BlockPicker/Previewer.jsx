import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

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

@inject('blocks')
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

  render() {
    const { blocks = {}, title, text, src } = this.props;
    return (
      <div className="preview-wrapper">
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
