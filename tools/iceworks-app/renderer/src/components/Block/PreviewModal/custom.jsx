import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { observer, inject } from 'mobx-react';
import Icon from '../../Icon';

import './index.scss';

@inject('customBlocks')
@observer
class CustomBlocksPreviewModal extends Component {
  static displayName = 'PreviewModal';

  static propTypes = {
    customBlocks: PropTypes.object.isRequired,
  };

  UNSAFE_componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    const { customBlocks } = this.props;
    return (
      <Modal
        isOpen={customBlocks.showModal}
        onRequestClose={customBlocks.closeModal}
        className="preview-modal"
        style={{ overlay: { background: '#fff', zIndex: '10000' } }}
      >
        <img
          className="preview-block-img"
          src={customBlocks.previewBlock.screenshot}
          alt={customBlocks.previewBlock.name}
        />
        <div className="preview-block-close" onClick={customBlocks.closeModal}>
          <Icon type="close" className="preview-block-close-icon" />
        </div>
      </Modal>
    );
  }
}

export default CustomBlocksPreviewModal;
