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
    handleDownBlocks: PropTypes.func
  };

  static defaultProps = {
    handleOpenPreviewPage: () => {},
    generatePage: () => {},
    handleDownBlocks: () => {}
  };

  constructor(props) {
    super(props);
    this.iceMaterialsSource = 'ice.alicdn.com/assets/react-materials.json';
  }

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
    const { materials } = this.props.blocks;
    // 目前支持飞冰物料源
    let iceMaterial = [];
    materials.forEach( material => {
      if(material.source.includes(this.iceMaterialsSource)) {
        iceMaterial = material;
      }
    });
    const iceBlocks = iceMaterial.originBlocks || [];
    return iceBlocks.filter( iceBlock => {
      const npm = iceBlock.source && iceBlock.source.npm;
      return blockGroup.blocks.includes(npm);
    })
  }

  render() {
    const { 
      blockGroup, handleOpenPreviewPage, generatePage, 
      newpage, pageBlockPicker, handleDownBlocks 
    } = this.props;
    const blocks = this.getBlocks();

    return (
      <div className="block block-group" onClick={this.handleClick}>
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
        <div className="handle">
          <Button className="handle-btn" onClick={(event) => {
              this.openBlockImgPreview(event, blocks);
            }}>
            <Icon size="small" type="02magnifyingglasspluszoom" /> 预览效果
          </Button>
          {/* 创建页面时展示 */}
          {newpage.visible && (
            <Button className="handle-btn" onClick={() => {
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
          {/* 添加区块时展示 */}
          {pageBlockPicker.visible && (
            <Button className="handle-btn" onClick={() => {
              handleDownBlocks(blocks);
              // 埋点
              log.report('app', { 
                action: 'download-block-groups',
                data: {
                  name: blockGroup.name,
                },
              });
            }}>
              <Icon size="small" type="paper-plane" /> 开始下载
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default BlockGroup