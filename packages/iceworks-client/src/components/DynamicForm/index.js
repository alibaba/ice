import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Switch, Select } from '@alifd/next';
import styles from './index.module.scss';

const components = {
  Input,
  Switch,
  Select,
};

const FormItem = Form.Item;

const DynamicForm = ({ config, formItemLayout, onChange }) => {
  const renderLabel = (item) => {
    return (
      <div>
        <h5 className={styles.itemLabel}>{item.label}</h5>
        <p>{item.description}</p>
      </div>
    );
  };

  const renderFormItems = () => {
    return config.map((item, index) => {
      const ComponentName = components[item.componentName];
      return (
        <FormItem
          label={renderLabel(item)}
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <ComponentName name={item.name} {...item.componentProps} />
        </FormItem>
      );
    });
  };

  return (
    <Form onChange={onChange} {...formItemLayout}>
      {renderFormItems()}
    </Form>
  );
};

DynamicForm.defaultProps = {
  formItemLayout: {},
  onChange: () => {},
};

DynamicForm.propTypes = {
  config: PropTypes.array.isRequired,
  formItemLayout: PropTypes.object,
  onChange: PropTypes.func,
};

export default DynamicForm;
