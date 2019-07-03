import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { Form, Input, Button } from '@alifd/next';
import TipIcon from '@components/TipIcon';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
};

const urlReg = /^(http|https):\/\//;

const addMaterialModal = ({
  on, onCancel, onSave, loading,
}) => {
  return (
    <Modal
      title={<FormattedMessage id="iceworks.material.add" />}
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
          size="medium"
          patternMessage="请输入物料名称"
          patternTrigger="onChange"
          label={(
            <span>
              <FormattedMessage id="iceworks.material.name" />
              <TipIcon>
                <FormattedMessage id="iceworks.material.nameTips" />
              </TipIcon>
            </span>
          )}
        >
          <Input
            className={styles.input}
            name="name"
            trim
            placeholder="请输入物料名称"
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          required
          size="medium"
          pattern={urlReg}
          patternMessage="请输入合法的 URL 地址"
          patternTrigger="onChange"
          label={(
            <span>
              <FormattedMessage id="iceworks.material.sourceUrl" />
              <TipIcon>
                <FormattedMessage id="iceworks.material.sourceUrlTips" />
              </TipIcon>
            </span>
          )}
        >
          <Input
            className={styles.input}
            name="url"
            trim
            placeholder="请输入合法的 URL 地址"
          />
        </FormItem>
        <div className={styles.opts}>
          <FormSubmit onClick={onSave} validate type="primary" className={styles.button} loading={loading}>
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

addMaterialModal.defaultProps = {
  loading: false,
};

addMaterialModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default addMaterialModal;
