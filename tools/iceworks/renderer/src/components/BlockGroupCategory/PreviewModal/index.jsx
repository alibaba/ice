import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { observer, inject } from 'mobx-react';
import Icon from '../../Icon';

import './index.scss';

@inject('blockGroups')
@observer
class BlockGroupPreviewModal extends Component {
  static displayName = 'PreviewModal';

  static propTypes = {
    blockGroups: PropTypes.object.isRequired,
  };

  UNSAFE_componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    const { blockGroups } = this.props;
    return (
      <Modal
        isOpen={blockGroups.showModal}
        onRequestClose={blockGroups.closeModal}
        className="preview-modal"
        style={{ overlay: { background: '#fff', zIndex: '10000' } }}
      >
        <div style={{ width: '100%', height: '100%' }}>
        {
          blockGroups.previewBlocks.map( (block, index) => {
            return (
              <img
                key={index}
                className="preview-block-img"
                src={block.screenshot}
                alt={block.name}
              />
            )
          })
        }
        </div>
        <div className="preview-block-close" onClick={blockGroups.closeModal}>
          <Icon type="close" className="preview-block-close-icon" />
        </div>
      </Modal>
    );
  }
}

export default BlockGroupPreviewModal;
