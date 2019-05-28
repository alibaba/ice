import React, { useEffect } from 'react';
import Card from '@components/Card';
import DynamicForm from '@components/DynamicForm';
import configurationStores from './stores';

const formItemLayout = {
  labelTextAlign: 'left',
  labelCol: {
    span: 16,
  },
  wrapperCol: {
    span: 6,
    offset: 1,
  },
};

const Configuration = () => {
  const configuration = configurationStores.useStore('configuration');

  const onChange = (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  useEffect(() => {
    configuration.getSettings();
  }, []);

  return (
    <Card title="自定义配置" contentHeight="100%">
      <DynamicForm
        config={configuration.dataSource.settings}
        formItemLayout={formItemLayout}
        onChange={onChange}
      />
    </Card>
  );
};

export default Configuration;
