import React, { useEffect } from 'react';
import { Message } from '@alifd/next';
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

  async function onChange(values) {
    const params = {};
    Object.keys(values).forEach(key => {
      // eslint-disable-next-line valid-typeof
      if (typeof values[key] !== undefined) {
        params[key] = values[key];
      }
    });

    logger.info(params);

    try {
      await conf.setCLIConf(params);
      Message.show({
        type: 'success',
        title: '提示',
        content: '配置修改成功',
        align: 'tr tr',
      });
    } catch (error) {
      Message.show({
        type: 'error',
        title: '提示',
        content: error.message,
        align: 'tr tr',
      });
    }
  }

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
