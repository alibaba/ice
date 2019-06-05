import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Modal from '@components/Modal';
import { Input, Select, Form, Field } from '@alifd/next';

import useWhenValueChanges from '../../../../hooks/useWhenValueChanges';
import stores from '../../stores';
import styles from './CreateRouterModal.module.scss';

const { Item: FormItem } = Form;

const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const field = new Field({});
const { init } = field;

const CreateRouterModal = ({
  on, onCancel, onOk, modalData,
}) => {
  const [formData, setFormData] = useState({});

  useWhenValueChanges(modalData, () => {
    if (modalData && modalData.formData) {
      setFormData(modalData.formData);
    }
  });

  const routersStore = stores.useStore('routers');
  const pagesStore = stores.useStore('pages');
  const layoutsStore = stores.useStore('layouts');
  const { dataSource: routers } = routersStore;
  const { dataSource: pages } = pagesStore;
  const { dataSource: layouts } = layoutsStore;

  function onChange(value) {
    setFormData(value);
  }

  function onSubmit() {
    field.validate((errors, values) => {
      if (!errors) {
        onOk(values);
      }
    });
  }

  function onValidtePath(rule, value, callback) {
    if (!value) {
      return callback('路径必填');
    }

    if (value.indexOf('/') !== 0) {
      return callback('路径必须以 \'/\' 开头');
    }
    const router = routers.find((item, index) => {
      if (item.path === value && modalData.editIndex !== index) {
        return true;
      }
      return false;
    });

    if (router) {
      return callback('路径已存在');
    }

    return callback();
  }

  return (
    <Modal
      title={<FormattedMessage id={`iceworks.project.panel.router.${modalData.action}.title`} />}
      visible={on}
      onCancel={onCancel}
      onOk={onSubmit}
      style={{ width: 600 }}
    >
      <Form {...formItemLayout} onChange={onChange} field={field} value={formData}>
        <FormItem label={<FormattedMessage id="iceworks.project.panel.router.form.path" />} required>
          <Input
            name="path"
            placeholder="请填写路径"
            {...init('path', {
              rules: [{
                validator: onValidtePath,
              }],
            }, {
              value: formData.path,
            })}
          />
        </FormItem>
        <FormItem label={<FormattedMessage id="iceworks.project.panel.router.form.page" />} required message="页面必选">
          <Select
            size="small"
            name="component"
            placeholder="请选择页面"
            dataSource={pages.map((page) => {
              return {
                label: page.name,
                value: page.name,
              };
            })}
            className={styles.selectBox}
          />
        </FormItem>
        <FormItem label={<FormattedMessage id="iceworks.project.panel.router.form.layout" />}>
          <Select
            size="small"
            name="layout"
            placeholder="请选择布局"
            dataSource={layouts.map((layout) => {
              return {
                label: layout.name,
                value: layout.name,
              };
            })}
            className={styles.selectBox}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

CreateRouterModal.propTypes = {
  on: PropTypes.bool.isRequired,
  modalData: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreateRouterModal;
