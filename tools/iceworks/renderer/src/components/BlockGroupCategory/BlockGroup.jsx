import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import './BlockGroup.scss';

@inject('blocks', 'blockGroups')
@observer
class BlockGroup extends Component {

  static propTypes = {
    handleOpenPreviewPage: PropTypes.func,
    generatePage:  PropTypes.func
  };

  static defaultProps = {
    handleOpenPreviewPage: () => {},
    generatePage: () => {}
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
    const { blockGroup, handleOpenPreviewPage, generatePage } = this.props;
    const blocks = this.getBlocks();
    return (
      <div className="block block-group" onClick={this.handleClick}>
        <div className="screenshot">
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
        <div className="title-wrapper">
            <div className="title-body">
              <div
                className="title"
                dangerouslySetInnerHTML={{ __html: blockGroup.name }}
              />
            </div>
        </div>
        <div className="panel">
            <span className="preview" onClick={(event) => {
              this.openBlockImgPreview(event, blocks);
            }}>
              <Tooltip
                placement={'bottom'}
                overlay={'预览效果图'}
              >
                <Icon type="02magnifyingglasspluszoom" />
              </Tooltip>
            </span>
            <span className="preview" onClick={() => {
              handleOpenPreviewPage(blocks);
            }}>
              <Tooltip placement={'bottom'} overlay={'预览页面'}>
                <Icon type="eye" />
              </Tooltip>
            </span>
            <span className="preview" onClick={() => {
              generatePage(blocks);
            }}>
              <Tooltip placement={'bottom'} overlay={'生成页面'}>
                <Icon type="paper-plane" />
              </Tooltip>
            </span>
          </div>
      </div>
    );
  }
}

export default BlockGroup