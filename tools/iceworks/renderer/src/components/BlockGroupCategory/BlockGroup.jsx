import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import services from '../../services';
import { Button } from '@icedesign/base';

const { log } = services;

import './BlockGroup.scss';

@inject('blocks', 'blockGroups', 'pageBlockPicker', 'newpage')
@observer
class BlockGroup extends Component {

  static propTypes = {
    handleOpenPreviewPage: PropTypes.func,
    generatePage: PropTypes.func,
    handleBlocksAdd: PropTypes.func,
    blockGroup: PropTypes.object  
  };

  static defaultProps = {
    handleOpenPreviewPage: () => {},
    generatePage: () => {},
    handleBlocksAdd: () => {},
    blockGroup: {}
  };

  openBlockImgPreview = (event, blocks) => {
    event.stopPropagation();
    const { blockGroups } = this.props;
    blockGroups.openModal(blocks);
  };

  /**
   * 根据区块组合的name，获取对应的区块对象。
   */
  getBlocks = () => {
    const { blocks = [] } = this.props.blockGroup;
    const { materials, getIceMaterial } = this.props.blocks;
    // 目前支持飞冰物料源
    const { iceMaterial }  = getIceMaterial() || {};
    const iceBlocks = iceMaterial.originBlocks || [];
    return blocks.map( block => {
      return iceBlocks.find( iceBlock => {
        const npm = iceBlock.source && iceBlock.source.npm;
        return block.includes(npm);
      })
    } )
  }

  onBlockGroupClick = () => {
    const { handleBlocksAdd, blockGroup } = this.props;
    const blocks = this.getBlocks();
    // 埋点
    log.report('app', {
      action: 'add-block-group',
      data: {
        name: blockGroup.name
      }
    })
    handleBlocksAdd(blocks);
  }

  render() {
    const { 
      blockGroup, handleOpenPreviewPage, generatePage, 
      newpage, pageBlockPicker
    } = this.props;
    const blocks = this.getBlocks();

    return (
      <div className="block ibg-block-group" onClick={this.onBlockGroupClick}>
        <div className="screenshot">
          <div className="screenshot-wrapper">
            {
              blocks.map( (block, index) => {
                return (
                  <img
                    key={index}
                    className="screenshot-img"
                    src={block.screenshot}
                  />
                )
              })
            } 
          </div>
        </div>
        <p>{blockGroup.name}</p>
        <div className="ibg-handle">
          <Button className="ibg-handle-btn" onClick={(event) => {
              this.openBlockImgPreview(event, blocks);
            }}>
            <Icon size="small" type="02magnifyingglasspluszoom" /> 预览效果
          </Button>
        </div>
      </div>
    );
  }
}

export default BlockGroup