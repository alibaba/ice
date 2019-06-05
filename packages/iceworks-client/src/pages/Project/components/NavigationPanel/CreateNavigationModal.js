import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { Input, Select, Switch, Form, Field } from '@alifd/next';
import createUid from '../../../../utils/createUid';
import useWhenValueChanges from '../../../../hooks/useWhenValueChanges';

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

const CreateNavigationModal = ({
  on, onCancel, onOk, modalData,
}) => {
  const [action, setAction] = useState('create');
  const [formData, setFormData] = useState({});

  const { linkType } = formData || {};

  useWhenValueChanges(modalData, () => {
    setAction(modalData.action);
    if (modalData.action === 'create') {
      setFormData({
        linkType: 'linkGroup',
      });
    } else if (modalData.action === 'edit' && modalData.formData) {
      setFormData(modalData.formData);
    }
  });

  function onChange(value) {
    setFormData(value);
  }

  function onSubmit() {
    field.validate((errors, values) => {
      const cacheValues = {
        ...values,
      };
      if (!errors) {
        let id = '';
        if (action === 'create') {
          id = createUid('Nav');

          if (cacheValues.linkType === 'linkGroup') {
            cacheValues.children = [];
          } else if (cacheValues.linkType === 'externalLink') {
            cacheValues.external = true;
          }
        }
        delete cacheValues.linkType;
        onOk(action, {
          ...cacheValues,
          id: values.id || id,
        });
      }
    });
  }

  return (
    <Modal
      title="添加导航"
      visible={on}
      onCancel={onCancel}
      onOk={onSubmit}
      style={{ width: 600 }}
    >
      <Form {...formItemLayout} onChange={onChange} field={field} value={formData}>
        <FormItem label="导航类型" required>
          <Select size="small" name="linkType" placeholder="请选择导航类型" disabled={action !== 'create'}>
            <option value="linkGroup">导航组</option>
            <option value="link">普通导航</option>
            <option value="externalLink">外链</option>
          </Select>
        </FormItem>
        <FormItem label="名称" required>
          <Input size="small" name="name" placeholder="请输入名称" />
        </FormItem>
        {linkType !== 'linkGroup' && (
          <FormItem label="路径">
            <Input size="small" name="path" placeholder="请输入路径" />
          </FormItem>
        )}
        <FormItem label="图标">
          <Input size="small" name="icon" placeholder="请输入图标(icon type)" />
        </FormItem>
        {linkType === 'externalLink' && (
          <FormItem label="是否打开新窗口">
            <Switch size="small" name="newWindow" />
          </FormItem>
        )}
      </Form>
    </Modal>
  );
};

CreateNavigationModal.propTypes = {
  on: PropTypes.bool.isRequired,
  modalData: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreateNavigationModal;
