import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button } from '@alifd/next';
import Modal from '@components/Modal';
import styles from './index.module.scss';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

const formItemLayout = {
  labelCol: {
    fixedSpan: 5,
  },
};

const CreateProjectModal = ({ on, onCancel, onOk }) => {
  const onSave = (values, errors) => {
    if (!errors) {
      onOk(values);
    }
  };

  return (
    <Modal
      title="填写项目信息"
      visible={on}
      onCancel={onCancel}
      onOk={onSave}
      footer={false}
    >
      <Form
        size="small"
        labelAlign="top"
        className={styles.form}
      >
        <FormItem
          {...formItemLayout}
          required
          size="medium"
          label="路径："
        >
          <Input
            className={styles.input}
            name="path"
            placeholder=""
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          required
          size="medium"
          label="目录名："
          pattern={/^[a-z]([-_a-z0-9]*)$/i}
          patternMessage="请输入字母与数字组合，字母开头"
          patternTrigger="onChange"
        >
          <Input
            className={styles.input}
            name="name"
            placeholder="请输入目录名，字母与数字组合，字母开头"
          />
        </FormItem>
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

CreateProjectModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreateProjectModal;
