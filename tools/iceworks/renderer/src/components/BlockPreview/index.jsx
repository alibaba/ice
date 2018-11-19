import { Button } from '@icedesign/base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import Icon from '../Icon';

import './index.scss';

// eslint-disable-next-line babel/new-cap
const BlockDragHandle = SortableHandle(({ src }) => (
  <div className="preview-block-screenshot">
    <img src={src} />
  </div>
));

@inject('customBlocks')
@observer
class Block extends Component {
  static propTypes = {
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func,
    onRemove: PropTypes.func,
    onAliasChange: PropTypes.func,
    block: PropTypes.object,
    orderIndex: PropTypes.number,
  };

  static defaultProps = {
    onMoveUp: () => {},
    onMoveDown: () => {},
    onRemove: () => {},
    onAliasChange: () => {},
  };

  hadnleRemove = (event) => {
    this.props.onRemove(this.props.orderIndex);
    event.preventDefault();
  };

  handleAliasChange = (event) => {
    const value = event.target.value;
    this.props.onAliasChange(this.props.orderIndex, value);
  };

  render() {
    const { block, style, className = '' } = this.props;
    return (
      <div className={`preview-block ${className}`} style={style}>
        <BlockDragHandle src={ block.type == 'custom'
          ? ( 'data:image/png;base64,' + this.props.customBlocks.getBlockImg(block.blockName) )
          : ( block.screenshot ) } />
        <div className="preview-block-operation">
          <Button
            title="移除"
            className="preview-block-btn"
            shape="text"
            size="large"
            onClick={this.hadnleRemove}
          >
            <Icon size="small" type="trash" />
          </Button>
        </div>
        <div className="block-alias-name">
          <input
            title="修改 block 文件名"
            onChange={this.handleAliasChange}
            defaultValue={this.props.block.alias}
          />
          <Icon size="small" className="pencil" type="pencil" />
        </div>
      </div>
    );
  }
}

@inject('blocks')
@observer
class BlockPreviewer extends Component {
  static propTypes = {
    block: PropTypes.object,
    orderIndex: PropTypes.number,
    orderCount: PropTypes.number,
    blocks: PropTypes.object,
  };

  render() {
    const { blocks, block, orderIndex, orderCount, ...other } = this.props;
    return (
      <Block
        className={cx({
          'preview-block-sorting': blocks.isSorting,
        })}
        block={block}
        orderIndex={orderIndex}
        {...other}
        isFirset={orderIndex == 0}
        isLast={orderCount - 1 == orderIndex}
      />
    );
  }
}
// eslint-disable-next-line babel/new-cap
export default SortableElement(BlockPreviewer);
