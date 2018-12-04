import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';

import Icon from '../Icon';

import './BlockGroup.scss';

import { inject, observer } from 'mobx-react';

@inject('blocks', 'blockGroups')
@observer
export default class BlockGroup extends Component {

  constructor(props) {
    super(props);
    this.iceMaterialsSource = 'ice.alicdn.com/assets/react-materials.json';
  }

  // openBlockImgPreview = (event, blocks) => {
  //   event.stopPropagation();
  //   blockGroups.openModal(blocks);
  // };

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
      return blockGroup.blocks.includes(iceBlock.name);
    })
  }

  render() {
    const { blockGroup } = this.props;
    const blocks = this.getBlocks();
    return (
      <div className="block-group" onClick={this.handleClick}>
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
          </div>
      </div>
    );
  }
}
