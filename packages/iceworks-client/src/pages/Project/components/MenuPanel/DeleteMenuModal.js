import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';

import styles from './DeleteMenuModal.module.scss';

const DeleteMenuModal = ({
  on, onCancel, onOk, menu,
}) => {
  const { children, external, name } = menu;
  let linkName = '导航';

  if (external) {
    linkName = '外链';
  } else if (Array.isArray(children)) {
    linkName = '导航组';
  }

  return (
    <Modal
      title={<FormattedMessage id="iceworks.project.panel.menu.delete.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk()}
    >
      <div>
        <FormattedMessage id="iceworks.project.panel.menu.delete.content" values={{ name, linkName }} />
        {children && children.length > 0 && (
          <span className={styles.tips}>
            <FormattedMessage id="iceworks.project.panel.menu.delete.subcontent" />
          </span>
        )}
      </div>
    </Modal>
  );
};

DeleteMenuModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
};

export default DeleteMenuModal;
