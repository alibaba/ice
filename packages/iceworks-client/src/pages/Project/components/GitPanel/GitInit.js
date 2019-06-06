import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Input, Form } from '@alifd/next';
import styles from './GitInit.module.scss';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

function GitInit({ onOk }) {
  async function onSave(values, errors) {
    if (!errors) {
      await onOk(values.remoteUrl);
    }
  }

  return (
    <Form>
      <div>关联仓库</div>
      <div>
        <FormItem
          required
          size="medium"
          label="仓库地址："
          className={styles.item}
        >
          <Input
            name="remoteUrl"
          />
        </FormItem>
        <div>
          <FormSubmit onClick={onSave} validate type="primary" className={styles.button}>
            <FormattedMessage id="iceworks.global.button.yes" />
          </FormSubmit>
        </div>
      </div>
    </Form>
  );
}

GitInit.propTypes = {
  onOk: PropTypes.func.isRequired,
};

export default GitInit;
