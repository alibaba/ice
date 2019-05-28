import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button } from '@alifd/next';
import Modal from '@components/Modal';
import Progress from '@components/Progress';
import stores from '@stores';
import styles from './SavePageModal.module.scss';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

const formItemLayout = {
  labelCol: {
    fixedSpan: 5,
  },
};

const SavePageModal = ({ on, onCancel, onOk }) => {
  const progress = stores.useStore('progress');

  async function onSave(values, errors) {
    if (!errors) {
      await onOk(values);
    }
  }

  return (
    <Modal
      title={<FormattedMessage id="iceworks.project.panel.page.save.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={onSave}
      footer={false}
    >
      <Form
        size="small"
        className={styles.form}
      >
        <FormItem
          {...formItemLayout}
          required
          labelAlign="top"
          size="medium"
          label={<FormattedMessage id="iceworks.project.panel.page.save.name.label" />}
          pattern={/^[a-z]([-_a-z0-9]*)$/i}
          patternMessage=""
          patternTrigger="onChange"
        >
          <Input
            className={styles.input}
            name="name"
            placeholder=""
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          required
          labelAlign="top"
          size="medium"
          label={<FormattedMessage id="iceworks.project.panel.page.save.routePath.label" />}
          pattern={/^(\/?)([a-zA-Z0-9:])([a-zA-Z0-9:]*)((\/)?[a-zA-Z0-9:]+)$/}
          patternMessage=""
          patternTrigger={['onBlur', 'onChange']}
        >
          <Input
            className={styles.input}
            name="routePath"
            placeholder=""
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          size="medium"
          labelAlign="top"
          label={<FormattedMessage id="iceworks.project.panel.page.save.menuName.label" />}
        >
          <Input
            className={styles.input}
            name="menuName"
            placeholder=""
          />
        </FormItem>
        <Progress
          {...progress.dataSource}
        />
        <div className={styles.opts}>
          <FormSubmit onClick={onSave} validate type="primary" className={styles.button}>
            <FormattedMessage id="iceworks.global.button.yes" />
          </FormSubmit>
          <Button onClick={onCancel} className={styles.button}>
            <FormattedMessage id="iceworks.global.button.no" />
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

SavePageModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default SavePageModal;
