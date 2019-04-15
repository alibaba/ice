import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CustomBlock from '../Block/CustomBlock';
import CustomBlockPreviewModal from '../Block/PreviewModal/custom'

import './index.scss';

@inject('customBlocks', 'blocks', 'pageBlockPicker')
@observer
class CustomBlockCategory extends Component {

  handleSelected = (block, blockName) => {
    this.props.blocks.addCustomBlock(block, blockName, this.props.pageBlockPicker.existBlocks);
  };

  render() {
    const customBlocks = this.props.customBlocks.blocksStorage;
    return (
      <div className="blcoks-wrapper">
        <div className="block-category">
          <div className="block-category-body">
            {Object.keys(customBlocks).map((blockName) => {
              return (
                <CustomBlock
                  key={blockName}
                  blockName={blockName}
                  block={customBlocks[blockName]}
                  onClick={this.handleSelected}
                />
                )})
              }
          </div>
        </div>
        <CustomBlockPreviewModal />
      </div>
    );
  }
}

export default CustomBlockCategory;
