import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Input, Form } from '@alifd/next';
import Modal from '@components/Modal';
import styles from './CreateBranchModal.module.scss';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

function CreateBranchModal({ onOk, on, onCancel }) {
  async function onSave(values, errors) {
    if (!errors) {
      await onOk(values.branch);
    }
  }

  return (
    <Modal
      title={<FormattedMessage id="iceworks.project.panel.git.createBranch.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={onOk}
      footer={false}
    >
      <Form className={styles.wrap}>
        <FormItem
          required
          size="medium"
          label={<FormattedMessage id="iceworks.project.panel.git.createBranch.branch.label" />}
          className={styles.item}
        >
          <Input
            name="branch"
          />
        </FormItem>
        <div>
          <FormSubmit onClick={onSave} validate type="primary" className={styles.button}>
            <FormattedMessage id="iceworks.global.button.yes" />
          </FormSubmit>
        </div>
      </Form>
    </Modal>
  );
}

CreateBranchModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreateBranchModal;
