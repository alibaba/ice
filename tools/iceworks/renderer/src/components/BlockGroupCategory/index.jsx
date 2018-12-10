import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BlockGroupPreviewModal from './PreviewModal'
import BlockGroup from './BlockGroup'

import './index.scss';

@inject('blockGroups', 'pageBlockPicker')
@observer
class BlockGroupCategory extends Component {
  static propTypes = {
    handleOpenPreviewPage: PropTypes.func,
    generatePage:  PropTypes.func,
    handleBlocksAdd: PropTypes.func
  };

  static defaultProps = {
    handleOpenPreviewPage: () => {},
    generatePage: () => {},
    handleBlocksAdd: () => {}
  };

  render() {
    const { blockGroups, isLoading } = this.props.blockGroups;
    const { generatePage, handleOpenPreviewPage, handleBlocksAdd } = this.props;

    if (!isLoading && blockGroups.length == 0) {
      return (
        <div
          style={{
            paddingTop: '100px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          当前暂无区块组合推荐。
        </div>
      );
    } else if (isLoading) {
      return (
        <div
          style={{
            paddingTop: '100px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          Loading....
        </div>
      );
    }

    return (
      <div className="ibg-block-groups-wrapper">
        <div className="ibg-block-groups">
          {blockGroups.map( (blockGroup, index) => {
            return (
              <BlockGroup
                key={index}
                blockGroup={blockGroup}
                handleOpenPreviewPage={handleOpenPreviewPage}
                generatePage={generatePage}
                handleBlocksAdd={handleBlocksAdd}
              />
            )
          })}
        </div>
        <BlockGroupPreviewModal />
      </div>
    );
  }
}

export default BlockGroupCategory;
