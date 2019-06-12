import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Input, Form } from '@alifd/next';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

function GitRemote({ onOk, remoteUrl: initRemoteUrl, submitMessage }) {
  const [remoteUrl, setRemoteUrl] = useState(initRemoteUrl);
  async function onSave(values, errors) {
    if (!errors) {
      await onOk(remoteUrl);
    }
  }

  async function onChange(value) {
    setRemoteUrl(value);
  }

  async function remoteUrlValidator(rule, value) {
    if (!value) {
      throw new Error('不能为空');
    }

    if (/^http.+.git$/.test(value)) {
      throw new Error('请使用 SSH 协议地址，即以 git@ 开头的地址');
    }

    if (!(/^git@.+.git$/.test(value))) {
      throw new Error('请输入正确的 git 仓库地址');
    }
  }

  return (
    <Form>
      <FormItem
        required
        size="medium"
        label={<FormattedMessage id="iceworks.project.panel.git.remote.url.label" />}
        className={styles.item}
        validator={remoteUrlValidator}
      >
        <Input
          name="remoteUrl"
          value={remoteUrl}
          onChange={onChange}
        />
      </FormItem>
      <FormSubmit onClick={onSave} validate type="primary" className={styles.button}>
        {submitMessage}
      </FormSubmit>
    </Form>
  );
}

GitRemote.defaultProps = {
  remoteUrl: '',
};

GitRemote.propTypes = {
  onOk: PropTypes.func.isRequired,
  remoteUrl: PropTypes.string,
  submitMessage: PropTypes.element.isRequired,
};

export default GitRemote;
