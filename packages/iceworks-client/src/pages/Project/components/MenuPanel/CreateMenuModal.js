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
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const field = new Field({});
const { getError } = field;
// match eg. /abc、/abc?name=123、/abc?:id
const pathReg = /^(\/?)([a-zA-Z0-9/-?@:=]+)$/;
// match eg. https://www.taobao.com、www.taobao.com
const urlReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const CreateMenuModal = ({
  on, onCancel, onOk, modalData, intl, currentType,
}) => {
  const { formatMessage } = intl;
  const [action, setAction] = useState('create');
  const [formData, setFormData] = useState({});
  const isEdit = action === 'edit';
  const isCreate = action === 'create';
  // @TODO: header config does not support nesting in current version
  const isHeader = currentType === 'header';

  const { linkType } = formData || {};

  useWhenValueChanges(modalData, () => {
    setAction(modalData.action);
    if (modalData.action === 'create') {
      setFormData({
        linkType: isHeader ? 'link' : 'linkGroup',
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
            {!isHeader && (
              <option value="linkGroup">
                <FormattedMessage id="iceworks.project.panel.menu.group" />
              </option>
            )}
            <option value="link">
              <FormattedMessage id="iceworks.project.panel.menu.ordinary" />
            </option>
            <option value="externalLink">
              <FormattedMessage id="iceworks.project.panel.menu.external" />
            </option>
          </Select>
        </FormItem>
        <FormItem
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.menu.form.name" />
              <TipIcon>
                <FormattedMessage id="iceworks.project.panel.menu.form.name.tip" />
              </TipIcon>
            </span>
          )}
          required
        >
          <Input size="small" name="name" placeholder={formatMessage({ id: 'iceworks.project.panel.menu.form.name.placeholder' })} />
        </FormItem>
        {linkType !== 'linkGroup' && (
          <FormItem
            label={(
              <span>
                <FormattedMessage id="iceworks.project.panel.menu.form.path" />
                <TipIcon>
                  <FormattedMessage id="iceworks.project.panel.menu.form.path.tip" />
                </TipIcon>
              </span>
            )}
            pattern={linkType === 'link' ? pathReg : urlReg}
            patternMessage={formatMessage({ id: 'iceworks.project.panel.menu.form.path.message' })}
            help={isEdit && linkType === 'link' ? (
              <div>
                {getError('path')}(<FormattedMessage id="iceworks.project.panel.menu.form.path.help" />)
              </div>
            ) : getError('path')}
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
                <FormattedMessage id="iceworks.project.panel.menu.form.icon.tip.first" />
                <a href="https://ice.alibaba-inc.com/component/foundationsymbol" target="__blank"> foundationsymbol </a>
                <FormattedMessage id="iceworks.project.panel.menu.form.icon.tip.end" />
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
  currentType: PropTypes.string.isRequired,
};

export default injectIntl(CreateMenuModal);
