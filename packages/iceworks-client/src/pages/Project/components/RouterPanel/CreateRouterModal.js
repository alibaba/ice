import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import TipIcon from '@components/TipIcon';
import Modal from '@components/Modal';
import { Input, Select, Form, Field, Switch } from '@alifd/next';
import path from 'path';

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
const { init, getError } = field;
let selectRouterGroup = false;

const CreateRouterModal = ({
  on, onCancel, onOk, modalData, intl,
}) => {
  const { formatMessage } = intl;
  const [formData, setFormData] = useState({});
  const [dataSource, setData] = useState([]);
  const { parent } = modalData;
  const isEdit = modalData.action === 'edit';

  const routersStore = stores.useStore('routes');
  const pagesStore = stores.useStore('pages');
  const layoutsStore = stores.useStore('layouts');
  const { dataSource: routes } = routersStore;
  const { dataSource: pages } = pagesStore;
  const { dataSource: layouts } = layoutsStore;

  const selectedPages = pages.map((page) => {
    return {
      label: page.name,
      value: page.name,
    };
  });

  const selectedLayouts = layouts.map((layout) => {
    return {
      label: layout.name,
      value: layout.name,
    };
  });

  function setDataSource(formValue) {
    let data = [];

    if (isEdit) {
      if (formValue.children) {
        data = selectedLayouts;
      } else {
        data = selectedPages;
      }
    } else if (parent || !selectRouterGroup) {
      data = selectedPages;
    } else {
      data = selectedLayouts;
    }
    setData(data);
  }

  useWhenValueChanges(modalData, () => {
    if (modalData && modalData.formData) {
      const formValue = {
        ...modalData.formData,
        layoutType: Boolean(modalData.formData.children),
      };
      selectRouterGroup = formValue.layoutType;
      setDataSource(formValue);
      setFormData(formValue);
    }
  });

  function onChange(value) {
    setFormData(value);
  }

  function onSubmit() {
    field.validate((errors, values) => {
      if (!errors) {
        const formValue = values;
        const { component } = formValue;
        if (component) {
          if (selectRouterGroup) {
            formValue.children = formValue.children || [];
          }
        }
        delete formValue.layoutType;
        onOk({
          formData: formValue,
          parent,
        });
      }
    });
  }

  function onValidtePath(rule, value, callback) {
    if (!value) {
      return callback(formatMessage({ id: 'iceworks.project.panel.router.form.path.required' }));
    }

    if (value.indexOf('/') !== 0) {
      return callback(formatMessage({ id: 'iceworks.project.panel.router.form.path.valid' }));
    }
    let url = value;
    if (parent) {
      url = path.join(parent.path, url);
    }
    const router = routes.find((item, index) => {
      let exist = false;
      if (item.path === url && modalData.editIndex !== index) {
        exist = true;
        return true;
      }
      if (item.children && !exist) {
        exist = item.children.some((route, childIndex) => {
          const compareUrl = path.join(item.path, route.path);
          if (
            compareUrl === url &&
            modalData.editIndex !== childIndex &&
            modalData.editParentIndex !== index
          ) {
            return true;
          }
          return false;
        });
      }
      return exist;
    });

    if (router) {
      return callback(formatMessage({ id: 'iceworks.project.panel.router.form.path.hasExist' }));
    }

    return callback();
  }

  async function onChangeLayoutType(value) {
    selectRouterGroup = value;
    setDataSource(formData);
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
        <FormItem
          required
          label={<FormattedMessage id="iceworks.project.panel.router.form.path" />}
          help={isEdit ? `${getError('path') ? getError('path') : ''}(修改了路径需要手动到导航配置里修改对应的路径)` : getError('path')}
        >
          <Input
            name="path"
            placeholder={formatMessage({ id: 'iceworks.project.panel.router.form.path.placeholder' })}
            {...init('path', {
              rules: [{
                validator: onValidtePath,
              }],
            }, {
              value: formData.path,
            })}
          />
        </FormItem>
        <FormItem
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.router.form.routerType" />
              <TipIcon>
                <FormattedMessage id="iceworks.project.panel.router.form.routerType.tip" />
              </TipIcon>
            </span>
          )}
        >
          <Switch
            size="small"
            name="layoutType"
            disabled={isEdit || (!isEdit && !!parent)}
            onChange={onChangeLayoutType}
          />
        </FormItem>
        <FormItem
          required
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.router.form.component" />
              <TipIcon>
                <FormattedMessage id="iceworks.project.panel.router.form.component.tip" />
              </TipIcon>
            </span>
          )}
        >
          <Select
            size="small"
            name="component"
            placeholder={formatMessage({ id: 'iceworks.project.panel.router.form.component.placeholder' })}
            dataSource={dataSource}
            className={styles.selectBox}
          />
        </FormItem>
        <FormItem
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.router.form.exact" />
              <TipIcon>
                <FormattedMessage id="iceworks.project.panel.router.form.exact.tip" />.
                <a href="https://reacttraining.com/react-router/web/api/Route/exact-bool" target="__blank">
                  <FormattedMessage id="iceworks.project.panel.router.form.exact.link" />
                </a>
              </TipIcon>
            </span>
          )}
        >
          <Switch
            size="small"
            name="exact"
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
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CreateRouterModal);
