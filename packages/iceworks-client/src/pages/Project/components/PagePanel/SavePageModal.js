import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button, Select } from '@alifd/next';
import Modal from '@components/Modal';
import TipIcon from '@components/TipIcon';
import Progress from '@components/Progress';
import stores from '@stores';
import pageStores from '../../stores';
import styles from './SavePageModal.module.scss';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
};

const SavePageModal = ({ on, onCancel, onOk }) => {
  const progress = stores.useStore('progress');
  const routerStore = pageStores.useStore('routes');
  const { dataSource: routes } = routerStore;
  const pathReg = /^(\/?)([a-zA-Z0-9:])([a-zA-Z0-9:]*)((\/)?[a-zA-Z0-9:]+)$/;

  async function onSave(values, errors) {
    if (!errors) {
      await onOk(values);
    }
  }

  const routerGroups = routes.filter(item => item.children).map(item => {
    return {
      label: `${item.path}(${item.component})`,
      value: item.path,
    };
  });

  return (
    <Modal
      title={<FormattedMessage id="iceworks.project.panel.page.save.title" />}
      visible={on}
      onCancel={onCancel}
      onOk={onSave}
      footer={false}
    >
      <Form
        size="small"
        className={styles.form}
      >
        <FormItem
          {...formItemLayout}
          required
          size="medium"
          pattern={/^[a-z]([-_a-z0-9]*)$/i}
          patternMessage="请填写正确的页面名，以字母 a-z 开头，不能包含中文"
          patternTrigger="onChange"
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.page.save.name.label" />
              <TipIcon>
                页面名称，会生成在代码中，请以英文、数字、-命名
              </TipIcon>
            </span>
          )}
        >
          <Input
            className={styles.input}
            name="name"
            placeholder=""
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          required
          size="medium"
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.page.save.routePath.label" />
              <TipIcon>
                填写路由路径最终会在 router config 中生成一个路由，不需要自己在配置路由
              </TipIcon>
            </span>
          )}
          pattern={pathReg}
          patternMessage="请填写正确的路径"
          patternTrigger={['onBlur', 'onChange']}
        >
          <Input
            className={styles.input}
            name="routePath"
            placeholder=""
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          size="medium"
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.page.save.routePath.group.label" />
              <TipIcon>
                选择一个已存在的路由分组，会将该路由放到这个分组下面，共用分组上的布局组件
              </TipIcon>
            </span>
          )}
        >
          <Select
            className={styles.select}
            name="routeGroup"
            dataSource={routerGroups}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          size="medium"
          label={(
            <span>
              <FormattedMessage id="iceworks.project.panel.page.save.menuName.label" />
              <TipIcon>
                填写该路由的导航名称，不填则不会生成，填写了以后会在导航根目录上生成一个新的导航
              </TipIcon>
            </span>
          )}
        >
          <Input
            className={styles.input}
            name="menuName"
            placeholder=""
          />
        </FormItem>
        <Progress
          {...progress.dataSource}
        />
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

SavePageModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default SavePageModal;
