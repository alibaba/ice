import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';

import styles from './DeleteRouterModal.module.scss';

const DeleteRouterModal = ({
  on, onCancel, onOk, router,
}) => {
  const { path } = router;

  return (
    <Modal
      title={<FormattedMessage id="iceworks.project.panel.router.delete.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk()}
    >
      <div>
        <FormattedMessage id="iceworks.project.panel.router.delete.content" values={{ name: path }} />
      </div>
      <div className={styles.warn}>
        注意：删除路由不会删除对应的导航，需要手动操作
      </div>
    </Modal>
  );
};

DeleteRouterModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

export default DeleteRouterModal;
