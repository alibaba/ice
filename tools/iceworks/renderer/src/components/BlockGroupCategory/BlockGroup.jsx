import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import services from '../../services';
import { Button } from '@icedesign/base';
import classnames from 'classnames';

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
    const { blockGroup } = this.props;
    const { materials, getIceMaterial } = this.props.blocks;
    // 目前支持飞冰物料源
    const { iceMaterial }  = getIceMaterial() || {};
    const iceBlocks = iceMaterial.originBlocks || [];
    return iceBlocks.filter( iceBlock => {
      const npm = iceBlock.source && iceBlock.source.npm;
      return blockGroup.blocks.includes(npm);
    })
  }

  onBlockGroupClick = () => {
    const { handleBlocksAdd, newpage } = this.props;
    // 如果当前是新建页面，return;
    if (newpage.visible) {
      return;
    } else {
      const blocks = this.getBlocks();
      handleBlocksAdd(blocks);
    }
  }

  render() {
    const { 
      blockGroup, handleOpenPreviewPage, generatePage, 
      newpage, pageBlockPicker
    } = this.props;
    const blocks = this.getBlocks();
    const btnCN = classnames({
      'ibg-handle-btn': true,
      'ibg-handle-btn-1': pageBlockPicker.visible
    });

    return (
      <div className="block block-group" onClick={this.onBlockGroupClick}>
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
          <Button className={btnCN} onClick={(event) => {
              this.openBlockImgPreview(event, blocks);
            }}>
            <Icon size="small" type="02magnifyingglasspluszoom" /> 预览效果
          </Button>
          {/* 创建页面时展示 */}
          {newpage.visible && (
            <Button className={btnCN} onClick={() => {
              generatePage(blocks);
              // 埋点
              log.report('app', { 
                action: 'download-block-groups',
                data: {
                  name: blockGroup.name,
                },
              });
            }}>
              <Icon size="small" type="paper-plane" /> 生成页面
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default BlockGroup