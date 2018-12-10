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
    onSelected: PropTypes.func
  };

  static defaultProps = {
    handleOpenPreviewPage: () => {},
    generatePage: () => {},
    onSelected: () => {}
  };

  render() {
    const { blockGroups, isLoading } = this.props.blockGroups;
    const { generatePage, handleOpenPreviewPage, onSelected } = this.props;

    if (isLoading) {
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
      <div className="blcoks-wrapper">
        <div className="block-groups">
          {blockGroups.map((blockGroup, index) => {
            return (
              <BlockGroup
                key={index}
                blockGroup={blockGroup}
                handleOpenPreviewPage={handleOpenPreviewPage}
                generatePage={generatePage}
                onSelected={onSelected}
              />
            )})
          }
        </div>
        <BlockGroupPreviewModal />
      </div>
    );
  }
}

export default BlockGroupCategory;
