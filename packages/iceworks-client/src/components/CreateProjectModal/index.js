import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import socket from '@src/socket';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button } from '@alifd/next';
import Modal from '@components/Modal';
import Icon from '@components/Icon';
import SelectWorkFolderModal from '@components/SelectWorkFolderModal';
import useModal from '@hooks/useModal';
import styles from './index.module.scss';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

const formItemLayout = {
  labelCol: {
    fixedSpan: 5,
  },
};

const CreateProjectModal = ({ on, onCancel, onOk }) => {
  const {
    on: onSelectModal,
    setModal: setSelectModal,
  } = useModal();
  const [data, setData] = useState({ name: '', path: '', workFolder: '' });

  function onSave(values, errors) {
    if (!errors) {
      onOk(values);
    }
  }

  async function onNameChange(value) {
    setData({
      ...data,
      name: value,
      path: await socket.emit('home.help.getPath', [data.workFolder, value]),
    });
  }

  async function onPathChange(value) {
    setSelectModal(false);

    setData({
      ...data,
      workFolder: value,
      path: data.name ? await socket.emit('home.help.getPath', [value, data.name]) : value,
    });
  }

  useEffect(() => {
    (async () => {
      const { path: workFolder } = await socket.emit('home.setting.workFolder');
      setData({
        ...data,
        path: workFolder,
        workFolder,
      });
    })();
  }, []);

  return (
    <Modal
      title="填写项目信息"
      visible={on}
      onCancel={onCancel}
      onOk={onSave}
      footer={false}
    >
      <SelectWorkFolderModal
        on={onSelectModal}
        onCancel={() => setSelectModal(false)}
        onOk={onPathChange}
      />
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
          className={styles.item}
        >
          <Input
            className={cx({
              [styles.input]: true,
              [styles.pathInput]: true,
            })}
            name="path"
            value={data.path}
            disabled
          />
          <Icon
            type="folderopen"
            size="large"
            className={styles.icon}
            onClick={() => setSelectModal(true)}
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
          className={styles.item}
        >
          <Input
            className={styles.input}
            name="name"
            placeholder="请输入目录名，字母与数字组合，字母开头"
            value={data.name}
            onChange={onNameChange}
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
