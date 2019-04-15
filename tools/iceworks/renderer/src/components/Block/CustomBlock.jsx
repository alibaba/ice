import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';

import Icon from '../Icon';

import './index.scss';

import { inject, observer } from 'mobx-react';

@inject('customBlocks')
@observer
export default class CustomBlock extends Component {
  handleClick = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props.block, this.props.blockName);
    }
  };

  openBlockImgPreview = (event) => {
    event.stopPropagation();
    const { customBlocks, blockName } = this.props;
    customBlocks.openModal(blockName);
  };

  render() {
    const { block, blockName } = this.props;

    return (
      <div className="block" onClick={this.handleClick}>
        <div className="screenshot">
          <img
            className="custom-screenshot-img"
            src={'data:image/png;base64,' + this.props.customBlocks.getBlockImg(blockName)}
          />
        </div>
        <div className="title-wrapper">
          <div className="title">{block.alias}</div>
          <div className="class-name">{blockName}</div>
        </div>
        <div className="panel">
          <span className="preview" onClick={this.openBlockImgPreview}>
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
