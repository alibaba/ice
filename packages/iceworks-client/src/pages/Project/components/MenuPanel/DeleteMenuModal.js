import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage, injectIntl } from 'react-intl';

import styles from './DeleteMenuModal.module.scss';

const DeleteMenuModal = ({
  on, onCancel, onOk, menu, intl,
}) => {
  const { formatMessage } = intl;
  const { children, external, name } = menu;
  let linkName = formatMessage({ id: 'iceworks.project.panel.menu.ordinary' });

  if (external) {
    linkName = formatMessage({ id: 'iceworks.project.panel.menu.external' });
  } else if (Array.isArray(children)) {
    linkName = formatMessage({ id: 'iceworks.project.panel.menu.group' });
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
          <div className={styles.tips}>
            <FormattedMessage id="iceworks.project.panel.menu.delete.subcontent" />
          </div>
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
  intl: PropTypes.object.isRequired,
};

export default injectIntl(DeleteMenuModal);
