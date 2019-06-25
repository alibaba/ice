import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
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
// match eg. /abc、/abc?name=123、/abc?:id
const pathReg = /^(\/?)([a-zA-Z0-9/-?@:=]+)$/;
// match eg. https://www.taobao.com、www.taobao.com
const urlReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const CreateMenuModal = ({
  on, onCancel, onOk, modalData, intl,
}) => {
  const { formatMessage } = intl;
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
        if (cacheValues.linkType !== 'externalLink') {
          delete cacheValues.external;
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
                <FormattedMessage id="iceworks.project.panel.menu.form.type.tip" />
              </TipIcon>
            </span>
          )}
          required
        >
          <Select size="small" name="linkType" placeholder={formatMessage({ id: 'iceworks.project.panel.menu.form.type.placeholder' })} disabled={isEdit}>
            <option value="linkGroup">菜单组</option>
            <option value="link">普通菜单</option>
            <option value="externalLink">外链</option>
          </Select>
        </FormItem>
        <FormItem label={<FormattedMessage id="iceworks.project.panel.menu.form.name" />} required>
          <Input size="small" name="name" placeholder={formatMessage({ id: 'iceworks.project.panel.menu.form.name.placeholder' })} />
        </FormItem>
        {linkType !== 'linkGroup' && (
          <FormItem
            label={<FormattedMessage id="iceworks.project.panel.menu.form.path" />}
            pattern={linkType === 'link' ? pathReg : urlReg}
            patternMessage={formatMessage({ id: 'iceworks.project.panel.menu.form.path.message' })}
            help={isEdit && linkType === 'link' ? formatMessage({ id: 'iceworks.project.panel.menu.form.path.help' }) : ''}
          >
            <Input size="small" name="path" placeholder={formatMessage({ id: 'iceworks.project.panel.menu.form.path.placeholder' })} />
          </FormItem>
        )}
        <FormItem
          pattern={/^[a-zA-Z]([-_a-zA-Z0-9]*)$/i}
          patternMessage={formatMessage({ id: 'iceworks.project.panel.menu.form.icon.message' })}
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
          <Input size="small" name="icon" placeholder={formatMessage({ id: 'iceworks.project.panel.menu.form.icon.placeholder' })} />
        </FormItem>
        {linkType === 'externalLink' && (
          <FormItem
            label={(
              <span>
                <FormattedMessage id="iceworks.project.panel.menu.form.newwindow" />
                <TipIcon>
                  <FormattedMessage id="iceworks.project.panel.menu.form.newwindow.tip" />
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
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateMenuModal);
