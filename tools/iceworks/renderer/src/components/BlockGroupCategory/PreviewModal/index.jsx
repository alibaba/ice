import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { observer, inject } from 'mobx-react';
import Icon from '../../Icon';

import './index.scss';

@inject('blocks')
@observer
class BlockGroupPreviewModal extends Component {
  static displayName = 'PreviewModal';

  static propTypes = {
    blocks: PropTypes.object.isRequired,
  };

  UNSAFE_componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    const { blocks } = this.props;
    return null;
    // return (
    //   <Modal
    //     isOpen={blocks.showModal}
    //     onRequestClose={blocks.closeModal}
    //     className="preview-modal"
    //     style={{ overlay: { background: '#fff', zIndex: '10000' } }}
    //   >
    //     <img
    //       className="preview-block-img"
    //       src={blocks.previewBlock.screenshot}
    //       alt={blocks.previewBlock.name}
    //     />
    //     <div className="preview-block-close" onClick={blocks.closeModal}>
    //       <Icon type="close" className="preview-block-close-icon" />
    //     </div>
    //   </Modal>
    // );
  }
}

export default BlockGroupPreviewModal;
