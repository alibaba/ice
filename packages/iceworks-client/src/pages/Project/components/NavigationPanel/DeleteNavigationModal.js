import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';

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
      title={<FormattedMessage id="iceworks.project.panel.navigation.delete.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk()}
    >
      <div>
        <FormattedMessage id="iceworks.project.panel.navigation.delete.content" values={{ name, linkName }} />
        {children && children.length > 0 && (
          <span className={styles.tips}>
            <FormattedMessage id="iceworks.project.panel.navigation.delete.subcontent" />
          </span>
        )}
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
