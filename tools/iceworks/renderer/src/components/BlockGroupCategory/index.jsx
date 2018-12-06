import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BlockGroupPreviewModal from './PreviewModal'
import BlockGroup from './BlockGroup'

import './index.scss';

@inject('blockGroups')
@observer
class BlockGroupCategory extends Component {
  static propTypes = {
    handleOpenPreviewPage: PropTypes.func,
    generatePage:  PropTypes.func
  };

  static defaultProps = {
    handleOpenPreviewPage: () => {},
    generatePage: () => {}
  };

  render() {
    const { blockGroups } = this.props.blockGroups;
    const { generatePage, handleOpenPreviewPage } = this.props;
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
