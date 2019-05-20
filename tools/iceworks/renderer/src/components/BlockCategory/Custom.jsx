import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CustomBlock from '../Block/CustomBlock';
import CustomBlockPreviewModal from '../Block/PreviewModal/custom';

import './index.scss';

@inject('localBlocks', 'blocks', 'pageBlockPicker')
@observer
class CustomBlockCategory extends Component {
  handleSelected = (block, blockName) => {
    this.props.blocks.addCustomBlock(block, blockName, this.props.pageBlockPicker.existBlocks);
  };

  render() {
    const { localBlocks } = this.props;
    const { blocksStorage } = localBlocks;
    return (
      <div className="blocks-wrapper">
        <div className="block-category">
          <div className="block-category-body">
            {Object.keys(blocksStorage).map((blockName) => {
              return (
                <CustomBlock
                  key={blockName}
                  blockName={blockName}
                  block={blocksStorage[blockName]}
                  onClick={this.handleSelected}
                />
              );
            })}
          </div>
        </div>
        <CustomBlockPreviewModal />
      </div>
    );
  }
}

export default CustomBlockCategory;
