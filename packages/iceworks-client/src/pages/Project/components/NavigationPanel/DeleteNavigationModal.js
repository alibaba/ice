import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';

import styles from './DeleteNavigationModal.module.scss';

const DeleteNavigationModal = ({
  on, onCancel, onOk, navigation,
}) => {
  const { children, external, name } = navigation;
  let linkName = '导航';

  if (external) {
    linkName = '外链';
  } else if (Array.isArray(children)) {
    linkName = '导航组';
  }

  return (
    <Modal
      title="删除导航"
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk()}
    >
      <div>
        <span>确定移除{linkName} &quot;{name}&quot; ？</span>
        {children && children.length > 0 && <span className={styles.tips}>导航组下还有导航，删除请谨慎！！！</span>}
      </div>
    </Modal>
  );
};

DeleteNavigationModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default DeleteNavigationModal;
