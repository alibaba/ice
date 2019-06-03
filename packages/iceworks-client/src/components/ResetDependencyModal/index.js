import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const ResetDependencyModal = ({
  on, onCancel, onOk, titleId, contentId,
}) => {
  return (
    <Modal
      title={<FormattedMessage id={titleId} />}
      visible={on}
      onCancel={onCancel}
      onOk={onOk}
    >
      <div className={styles.wrapper}>
        <FormattedMessage id={contentId} />
      </div>
    </Modal>
  );
};

ResetDependencyModal.defaultProps = {
  titleId: 'iceworks.project.panel.dependency.main.reset.title',
  contentId: 'iceworks.project.panel.dependency.main.reset.content',
};

ResetDependencyModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  titleId: PropTypes.string,
  contentId: PropTypes.string,
};

export default ResetDependencyModal;
