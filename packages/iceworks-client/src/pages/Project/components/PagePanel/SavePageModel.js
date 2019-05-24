import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from '@alifd/next';
import Modal from '@components/Modal';
import styles from './SavePageModel.module.scss';

const FormItem = Form.Item;
const FormSubmit = Form.Submit;

const formItemLayout = {
  labelCol: {
    fixedSpan: 5,
  },
};

const SavePageModel = ({ on, onCancel, onOk }) => {
  const onSave = (values, errors) => {
    if (!errors) {
      onOk(values);
    }
  };

  return (
    <Modal
      title="填写页面信息"
      visible={on}
      onCancel={onCancel}
      onOk={onSave}
      footer={false}
    >
      <Form
        size="small"
        direction="ver"
        className={styles.form}
      >
        <FormItem
          {...formItemLayout}
          required
          size="medium"
          label="页面目录名"
          pattern={/^[a-z]([-_a-z0-9]*)$/i}
          patternMessage="请输入字母与数字组合，字母开头"
          patternTrigger="onChange"
        >
          <Input
            className={styles.input}
            name="name"
            placeholder="请输入页面目录名，字母与数字组合，字母开头"
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          required
          size="medium"
          label="路由路径"
          pattern={/^(\/?)([a-zA-Z0-9:])([a-zA-Z0-9:]*)((\/)?[a-zA-Z0-9:]+)$/}
          patternMessage="请输入小写字母数字组合，支持二级路由以 `/` 分隔"
          patternTrigger={['onBlur', 'onChange']}
        >
          <Input
            className={styles.input}
            name="routePath"
            placeholder="请输入小写字母数字组合，支持二级路由以 `/` 分隔"
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          size="medium"
          label="页面导航名"
        >
          <Input
            className={styles.input}
            name="menuName"
            placeholder="为空则不生成导航项"
          />
        </FormItem>
        <div className={styles.opts}>
          <FormSubmit onClick={onSave} validate type="primary" className={styles.button}>
            确定
          </FormSubmit>
          <Button onClick={onCancel} className={styles.button}>
            取消
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

SavePageModel.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default SavePageModel;
