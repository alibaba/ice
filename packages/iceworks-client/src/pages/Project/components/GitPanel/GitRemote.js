import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Input, Form } from '@alifd/next';
import styles from './GitRemote.module.scss';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

function GitRemote({ onOk, remoteUrl: initRemoteUrl }) {
  const [remoteUrl, setRemoteUrl] = useState(initRemoteUrl);
  async function onSave(values, errors) {
    if (!errors) {
      await onOk(remoteUrl);
    }
  }

  async function onChange(value) {
    setRemoteUrl(value);
  }

  return (
    <Form>
      <div>
        <FormItem
          required
          size="medium"
          label="仓库地址："
          className={styles.item}
        >
          <Input
            name="remoteUrl"
            value={remoteUrl}
            onChange={onChange}
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

GitRemote.defaultProps = {
  remoteUrl: '',
};

GitRemote.propTypes = {
  onOk: PropTypes.func.isRequired,
  remoteUrl: PropTypes.string,
};

export default GitRemote;
