import React, { useEffect } from 'react';
import showMessage from '@utils/showMessage';
import logger from '@utils/logger';
import { injectIntl, FormattedMessage } from 'react-intl';
import Card from '@components/Card';
import DynamicForm from '@components/DynamicForm';
import engineeringStores from '../../stores';

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
  const confStore = engineeringStores.useStore('configuration');

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
      await confStore.setCLIConf(params);
      showMessage('配置修改成功', 'success');
    } catch (error) {
      showMessage(error);
    }
  }

  async function onGetCLIConf() {
    try {
      await confStore.getCLIConf();
    } catch (error) {
      showMessage(error);
    }
  }

  useEffect(() => {
    onGetCLIConf();
  }, []);

  return (
    <Card title={<FormattedMessage id="iceworks.engineer.config.title" />} contentHeight="100%">
      <DynamicForm
        config={confStore.dataSource.cli}
        formItemLayout={formItemLayout}
        onChange={onChange}
      />
    </Card>
  );
};

export default injectIntl(Configuration);
