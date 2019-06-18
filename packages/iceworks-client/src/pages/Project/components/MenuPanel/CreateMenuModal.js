import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Modal from '@components/Modal';
import TipIcon from '@components/TipIcon';
import { Input, Select, Switch, Form, Field } from '@alifd/next';
import useWhenValueChanges from '@hooks/useWhenValueChanges';

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
const pathReg = /^(\/?)([a-zA-Z0-9/-?@:=]+)$/;
const urlReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const CreateMenuModal = ({
  on, onCancel, onOk, modalData,
}) => {
  const [action, setAction] = useState('create');
  const [formData, setFormData] = useState({});
  const isEdit = action === 'edit';
  const isCreate = action === 'create';

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
    const cacheValues = {
      ...value,
    };
    if (isCreate) {
      delete cacheValues.id;
    }
    setFormData(cacheValues);
  }

  function onSubmit() {
    field.validate((errors) => {
      const cacheValues = {
        ...formData,
      };
      if (!errors) {
        if (isCreate) {
          if (cacheValues.linkType === 'linkGroup') {
            cacheValues.children = [];
          } else if (cacheValues.linkType === 'externalLink') {
            cacheValues.external = true;
          }
        }
        if (cacheValues.linkType !== 'linkGroup') {
          delete cacheValues.children;
        }
        delete cacheValues.linkType;
        onOk(action, {
          ...cacheValues,
        });
      }
    });
  }

  return (
    <Modal
      title={<FormattedMessage id={`iceworks.project.panel.menu.${action}.title`} />}
      visible={on}
      onCancel={onCancel}
      onOk={onSubmit}
      style={{ width: 600, maxHeight: 450 }}
      shouldUpdatePosition
    >
      <Form {...formItemLayout} onChange={onChange} field={field} value={formData}>
        <FormItem
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.menu.form.type" />
              <TipIcon>
                总共有菜单组、普通菜单、外链三种类型，菜单组下可以放入普通菜单和外链
              </TipIcon>
            </span>
          )}
          required
        >
          <Select size="small" name="linkType" placeholder="请选择菜单类型" disabled={isEdit}>
            <option value="linkGroup">菜单组</option>
            <option value="link">普通菜单</option>
            <option value="externalLink">外链</option>
          </Select>
        </FormItem>
        <FormItem label={<FormattedMessage id="iceworks.project.panel.menu.form.name" />} required>
          <Input size="small" name="name" placeholder="请输入名称" />
        </FormItem>
        {linkType !== 'linkGroup' && (
          <FormItem
            label={<FormattedMessage id="iceworks.project.panel.menu.form.path" />}
            pattern={linkType === 'link' ? pathReg : urlReg}
            patternMessage="请填写正确的路径"
            help={isEdit && linkType === 'link' ? '修改了路径需要手动到路由配置里修改对应的路径' : ''}
          >
            <Input size="small" name="path" placeholder="请输入路径" />
          </FormItem>
        )}
        <FormItem
          pattern={/^[a-zA-Z]([-_a-zA-Z0-9]*)$/i}
          patternMessage="请填写正确的图标名称"
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.menu.form.icon" />
              <TipIcon>
                菜单项图标，可以从
                <a href="https://ice.alibaba-inc.com/component/foundationsymbol" target="__blank"> foundationsymbol </a>
                中选择
              </TipIcon>
            </span>
          )}
        >
          <Input size="small" name="icon" placeholder="请输入图标(icon type)" />
        </FormItem>
        {linkType === 'externalLink' && (
          <FormItem
            label={(
              <span>
                <FormattedMessage id="iceworks.project.panel.menu.form.newwindow" />
                <TipIcon>
                  浏览器点击外链是否新打开页面
                </TipIcon>
              </span>
            )}
          >
            <Switch size="small" name="newWindow" />
          </FormItem>
        )}
      </Form>
    </Modal>
  );
};

CreateMenuModal.propTypes = {
  on: PropTypes.bool.isRequired,
  modalData: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreateMenuModal;
