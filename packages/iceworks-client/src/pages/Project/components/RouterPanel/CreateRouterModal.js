import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import TipIcon from '@components/TipIcon';
import Modal from '@components/Modal';
import { Input, Select, Form, Field, Switch } from '@alifd/next';

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

const CreateRouterModal = ({
  on, onCancel, onOk, modalData,
}) => {
  const [formData, setFormData] = useState({});
  const { parent } = modalData;
  const isEdit = modalData.action === 'edit';

  useWhenValueChanges(modalData, () => {
    if (modalData && modalData.formData) {
      const formValue = {
        ...modalData.formData,
      };
      const { component, children } = formValue;
      if (component) {
        // layout component
        if (children) {
          formValue.component = `layout-${component}`;
        } else {
          formValue.component = `page-${component}`;
        }
      }
      setFormData(formValue);
    }
  });

  const routersStore = stores.useStore('routes');
  const pagesStore = stores.useStore('pages');
  const layoutsStore = stores.useStore('layouts');
  const { dataSource: routes } = routersStore;
  const { dataSource: pages } = pagesStore;
  const { dataSource: layouts } = layoutsStore;
  let dataSource = [];

  const pageSelects = pages.map((page) => {
    return {
      label: page.name,
      value: `page-${page.name}`,
    };
  });

  const layoutSelects = layouts.map((layout) => {
    return {
      label: layout.name,
      value: `layout-${layout.name}`,
    };
  });

  if (!isEdit) {
    if (parent) {
      dataSource = pageSelects;
    } else {
      dataSource = [{
        label: '布局(只有布局才能配置子路由)',
        children: layoutSelects,
      }, {
        label: '页面(普通组件)',
        children: pageSelects,
      }];
    }
  } else if (formData.children) {
    dataSource = layoutSelects;
  } else {
    dataSource = pageSelects;
  }

  function onChange(value) {
    setFormData(value);
  }

  function onSubmit() {
    field.validate((errors, values) => {
      if (!errors) {
        const formValue = values;
        const { component } = formValue;
        if (component) {
          const [type, componentValue] = component.split(/-(.+)/);
          if (type === 'layout') {
            formValue.children = formValue.children || [];
          }
          formValue.component = componentValue;
        }
        onOk({
          formData: formValue,
          parent,
        });
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
    const router = routes.find((item, index) => {
      let exist = false;
      if (item.path === value && modalData.editIndex !== index) {
        exist = true;
        return true;
      }
      if (item.children) {
        exist = item.children.some((route, childIndex) => {
          if (
            route.path === value &&
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
        <FormItem
          required
          label={<FormattedMessage id="iceworks.project.panel.router.form.path" />}
          help={isEdit ? `${getError('path') ? getError('path') : ''}(修改了路径需要手动到导航配置里修改对应的路径)` : getError('path')}
        >
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
        <FormItem
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.router.form.component" />
              <TipIcon>
                如果只有一个页面，没有 layout，只需选择页面下的某一个组件，如果是一个路由组(底下有子路由)，就必须选择布局
              </TipIcon>
            </span>
          )}
        >
          <Select
            size="small"
            name="component"
            placeholder="请选择组件"
            dataSource={dataSource}
            className={styles.selectBox}
          />
        </FormItem>
        <FormItem
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.router.form.exact" />
              <TipIcon>
                路径是否精确匹配，如果选择了精确匹配，路径写 /one，访问 /one/two 是不能匹配的，具体文档请参考
                <a href="https://reacttraining.com/react-router/web/api/Route/exact-bool" target="__blank">链接</a>
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
};

export default CreateRouterModal;
