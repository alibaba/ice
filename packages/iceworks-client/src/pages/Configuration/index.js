import React, { useEffect } from 'react';
import logger from '@utils/logger';
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
  const conf = configurationStores.useStore('configuration');

  const onChange = (values) => {
    const params = {};
    Object.keys(values).forEach(key => {
      if (values[key] !== undefined) {
        params[key] = values[key];
      }
    });
    logger.info(params);
    conf.setCLIConf(params);
  };

  useEffect(() => {
    conf.getCLIConf();
  }, []);

  return (
    <Card title="自定义配置" contentHeight="100%">
      <DynamicForm
        config={conf.dataSource.cli}
        formItemLayout={formItemLayout}
        onChange={onChange}
      />
    </Card>
  );
};

export default Configuration;
