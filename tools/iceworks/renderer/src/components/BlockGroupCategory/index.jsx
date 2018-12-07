import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BlockGroupPreviewModal from './PreviewModal'
import BlockGroup from './BlockGroup'
import { Loading } from '@icedesign/base';

import './index.scss';

@inject('blockGroups', 'pageBlockPicker')
@observer
class BlockGroupCategory extends Component {
  static propTypes = {
    handleOpenPreviewPage: PropTypes.func,
    generatePage:  PropTypes.func,
    handleDownBlocks: PropTypes.func
  };

  static defaultProps = {
    handleOpenPreviewPage: () => {},
    generatePage: () => {},
    handleDownBlocks: () => {}
  };

  render() {
    const { blockGroups } = this.props.blockGroups;
    const { generatePage, handleOpenPreviewPage, handleDownBlocks } = this.props;
    return (
      <Loading
        shape="flower" color="#333" tip="区块组合下载中..." 
        visible={this.props.pageBlockPicker.downloading}
        className="block-groups-downloading"
      >
        <div className="blcoks-wrapper">
          <div className="block-groups">
            {blockGroups.map((blockGroup, index) => {
              return (
                <BlockGroup
                  key={index}
                  blockGroup={blockGroup}
                  handleOpenPreviewPage={handleOpenPreviewPage}
                  generatePage={generatePage}
                  handleDownBlocks={handleDownBlocks}
                />
              )})
            }
          </div>
          <BlockGroupPreviewModal />
        </div>
      </Loading>
    );
  }
}

export default BlockGroupCategory;
