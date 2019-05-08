import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Switch } from '@alifd/next';

const components = {
  Input,
  Switch,
};

const FormItem = Form.Item;

const DynamicForm = ({ config, formItemLayout, onChange }) => {
  const renderFormItems = () => {
    return config.map((item, index) => {
      const ComponentName = components[item.componentName];
      return (
        <FormItem label={item.label} key={index}>
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
